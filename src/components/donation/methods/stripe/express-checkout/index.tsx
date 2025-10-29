import { Elements } from "@stripe/react-stripe-js";
import { stripe_promise } from "../../../common/stripe";
import { Content } from "./content";

interface Props {
  classes?: string;
  amount_cents: number;
  /** lowercase */
  currency: string;
}

export function ExpressCheckout({
  classes = "",
  amount_cents,
  currency,
}: Props) {
  return (
    <Elements
      stripe={stripe_promise}
      options={{
        loader: "always",
        mode: "payment",
        amount: amount_cents,
        currency: currency,
      }}
    >
      <Content classes={classes} />
    </Elements>
  );
}
