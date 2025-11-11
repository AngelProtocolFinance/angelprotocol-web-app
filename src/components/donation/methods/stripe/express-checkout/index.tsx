import { Elements, ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { stripe_promise } from "../../../common/stripe";
import type { IAmntExpress } from "../use-rhf";

interface Props extends IAmntExpress {
  classes?: string;
}

export function ExpressCheckout({
  classes = "",
  total_atomic,
  currency,
  frequency,
}: Props) {
  return (
    <Elements
      stripe={stripe_promise}
      options={{
        loader: "always",
        mode: frequency === "recurring" ? "setup" : "payment",
        amount: frequency === "recurring" ? undefined : total_atomic,
        payment_method_types: ["card", "link"],
        currency,
      }}
    >
      <ExpressCheckoutElement
        id="express-checkout"
        className={`${classes} b`}
        onConfirm={(x) => {
          console.log(x);
        }}
      />
    </Elements>
  );
}
