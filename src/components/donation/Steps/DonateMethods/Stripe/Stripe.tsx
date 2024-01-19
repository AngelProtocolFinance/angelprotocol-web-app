import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { FormValues, Props } from "./types";
import { SemiPartial } from "types/utils";
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
      const { type, ...defaultValues } = step;
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
                email: fv.email,
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
                email: step.email,
                endowmentId: props.state.recipient.id,
                splitLiq: step.pctLiquidSplit.toString(),
                kycData: {
                  city: kyc.city,
                  consent_marketing: true,
                  consent_tax: true,
                  country: kyc.country.name,
                  fullName: `${kyc.name.first} ${kyc.name.last}`,
                  kycEmail: kyc.kycEmail,
                  streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
                  state: kyc.usState.value || kyc.state,
                  zipCode: kyc.postalCode,
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
