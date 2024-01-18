import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { FormValues, Props } from "./types";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import KYCForm from "components/KYCForm";
import { KYC } from "slices/donation";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import Checkout from "./Checkout";
import Form from "./Form";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Stripe(props: Props) {
  const [step, setStep] = useState<Step>({ type: "init" });

  const { handleError } = useErrorContext();
  const [createPaymentIntent] = useCreateStripePaymentIntentMutation();

  switch (step.type) {
    case "init":
      const { type, kycData, ...defaultValues } = step;
      return (
        <Form
          {...props}
          defaultValues={defaultValues}
          onSubmit={async (fv) => {
            if (fv.userOptForKYC) {
              return setStep({ ...step, type: "kyc", ...fv });
            }
            try {
              const { clientSecret } = await createPaymentIntent({
                amount: +fv.amount,
                currency: fv.currency.code,
                endowmentId: props.state.recipient.id,
                kycData: { email: fv.email },
                splitLiq: fv.pctLiquidSplit.toString(),
              }).unwrap();
              setStep({ ...step, type: "checkout", clientSecret, ...fv });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    case "kyc":
      return (
        <KYCForm
          type="on-donation"
          classes="grid gap-5 sm:grid-cols-2"
          defaultValues={step.kycData}
          recipient={props.state.recipient}
          onBack={() => setStep({ ...step, type: "init" })}
          onSubmit={async (kyc) => {
            try {
              const { clientSecret } = await createPaymentIntent({
                amount: +step.amount,
                currency: step.currency.code,
                endowmentId: props.state.recipient.id,
                splitLiq: step.pctLiquidSplit.toString(),
                kycData: {
                  fullName: `${kyc.name.first} ${kyc.name.last}`,
                  email: kyc.email,
                  streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
                  city: kyc.city,
                  state: kyc.usState.value || kyc.state,
                  zipCode: kyc.postalCode,
                  country: kyc.country.name,
                  consent_tax: true,
                  consent_marketing: true,
                },
              }).unwrap();
              setStep({
                ...step,
                type: "checkout",
                clientSecret,
                kycData: kyc,
              });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    default:
      return (
        <Elements
          options={{
            clientSecret: step.clientSecret,
            appearance: { theme: "stripe" },
          }}
          stripe={stripePromise}
        >
          <Checkout
            onBack={() => {
              // check whether KYC step was performed
              if (step.userOptForKYC) {
                setStep({ ...step, type: "kyc" });
              } else {
                setStep({ ...step, type: "init" });
              }
            }}
          />
        </Elements>
      );
  }
}

type InitStep = {
  type: "init";
  kycData?: KYC;
} & Partial<FormValues>;

type KYCStep = {
  type: "kyc";
} & Required<Omit<InitStep, "type" | "kycData">> &
  Pick<InitStep, "kycData">;

type CheckoutStep = {
  type: "checkout";
  clientSecret: string;
} & Omit<KYCStep, "type">;

type Step = InitStep | KYCStep | CheckoutStep;
