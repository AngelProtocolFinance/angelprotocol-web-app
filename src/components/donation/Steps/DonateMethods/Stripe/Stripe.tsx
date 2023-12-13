import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Props } from "./types";
import Checkout from "./Checkout";
import Form from "./Form";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

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
