import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Props } from "./types";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import Checkout from "./Checkout";
import Form from "./Form";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Stripe(props: Props) {
  const [clientSecret, setClientSecret] = useState("");
  const [showKYC, setShowKYC] = useState(props.state.recipient.isKYCRequired);

  if (!clientSecret) {
    return (
      <Form
        {...props}
        onSubmit={(newClientSecret, userOptForKYC) => {
          setClientSecret(newClientSecret);
          setShowKYC(userOptForKYC);
        }}
      />
    );
  }

  if (showKYC) {
    return null;
  }

  return (
    <Elements
      options={{ clientSecret, appearance: { theme: "stripe" } }}
      stripe={stripePromise}
    >
      <Checkout onBack={() => setClientSecret("")} />
    </Elements>
  );
}
