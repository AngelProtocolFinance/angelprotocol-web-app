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
  const [step, setStep] = useState<Steps>({ type: "init" });
  const { handleError } = useErrorContext();
  const [createPaymentIntent] = useCreateStripePaymentIntentMutation();

  switch (step.type) {
    case "init":
      return (
        <Form
          {...props}
          onSubmit={async (formValues) => {
            if (
              props.state.recipient.isKYCRequired ||
              formValues.userOptForKYC
            ) {
              return setStep({ type: "kyc", ...formValues });
            }
            try {
              const { clientSecret } = await createPaymentIntent({
                amount: formValues.amount,
                endowmentId: props.state.recipient.id,
                liquidSplitPct: formValues.pctLiquidSplit.toString(),
              }).unwrap();
              setStep({ type: "checkout", clientSecret, ...formValues });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    case "kyc": {
      return (
        <KYCForm
          type="on-donation"
          recipient={props.state.recipient}
          onBack={() => setStep({ type: "init" })}
          onSubmit={async (formValues) => {
            try {
              const {
                name,
                address,
                email,
                city,
                state,
                usState,
                postalCode,
                country,
              } = formValues;

              const { clientSecret } = await createPaymentIntent({
                amount: step.amount,
                endowmentId: props.state.recipient.id,
                liquidSplitPct: step.pctLiquidSplit.toString(),
                kycData: {
                  city,
                  consent_marketing: true, // NEED A CHECKBOX FOR THIS???
                  consent_tax: true, // NEED A CHECKBOX FOR THIS???
                  country: country.name,
                  email,
                  fullName: `${name.first} ${name.last}`,
                  state: usState.value || state,
                  streetAddress: `${address.street} ${address.complement}`,
                  zipCode: postalCode,
                },
              }).unwrap();
              const { type, ...checkoutData } = step;
              setStep({ type: "checkout", clientSecret, ...checkoutData });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    }
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
              if (props.state.recipient.isKYCRequired || step.userOptForKYC) {
                const { type, clientSecret, ...kycData } = step;
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

type Steps = InitStep | CheckoutStep | KYCStep;
