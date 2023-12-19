import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Props } from "./types";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import KYCForm from "components/KYCForm";
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
      return (
        <Form
          {...props}
          onSubmit={async (fv) => {
            if (fv.userOptForKYC) {
              return setStep({ type: "kyc", ...fv });
            }
            try {
              const { clientSecret } = await createPaymentIntent({
                amount: fv.amount,
                endowmentId: props.state.recipient.id,
                liquidSplitPct: fv.pctLiquidSplit.toString(),
              }).unwrap();
              setStep({ type: "checkout", clientSecret, ...fv });
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
          recipient={props.state.recipient}
          onBack={() => setStep({ type: "init" })}
          onSubmit={async (kyc) => {
            try {
              const { clientSecret } = await createPaymentIntent({
                amount: step.amount,
                endowmentId: props.state.recipient.id,
                liquidSplitPct: step.pctLiquidSplit.toString(),
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
              setStep({ ...step, type: "checkout", clientSecret });
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
              // KYC step was performed
              if (step.userOptForKYC) {
                const { type, ...kycData } = step;
                setStep({ type: "kyc", ...kycData });
              } else {
                setStep({ type: "init" });
              }
            }}
          />
        </Elements>
      );
  }
}

type InitStep = {
  type: "init";
};

type KYCStep = {
  type: "kyc";
  amount: number;
  pctLiquidSplit: number;
  userOptForKYC: boolean;
};

type CheckoutStep = {
  type: "checkout";
  clientSecret: string;
} & Omit<KYCStep, "type">;

type Step = InitStep | KYCStep | CheckoutStep;
