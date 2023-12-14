import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Props } from "./types";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import Checkout from "./Checkout";
import Form from "./Form";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function Stripe(props: Props) {
  const [clientSecret, setClientSecret] = useState("");

  if (!clientSecret) {
    return <Form {...props} onClientSecretLoaded={setClientSecret} />;
  }

  return (
    <Elements
      options={{ clientSecret, appearance: { theme: "stripe" } }}
      stripe={stripePromise}
    >
      <Checkout />
    </Elements>
  );
}
