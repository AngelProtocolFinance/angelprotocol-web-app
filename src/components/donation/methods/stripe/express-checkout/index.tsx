import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { stripe_promise } from "../../../common/stripe";
import type { IExpress } from "../use-rhf";
import { Content, type IContentExternal } from "./content";

interface Props extends IExpress, IContentExternal {}

export function ExpressCheckout({ classes = "", items, ...p }: Props) {
  const c = p.currency.toLowerCase();
  const opts: StripeElementsOptions =
    p.frequency === "recurring"
      ? { mode: "setup", currency: c }
      : { mode: "payment", amount: p.total_atomic, currency: c };

  return (
    <Elements stripe={stripe_promise} options={opts}>
      <Content
        classes={`${classes} ${p.is_partial ? "grayscale pointer-events-none" : ""}`}
        on_click={({ resolve }) => {
          resolve({
            lineItems: items.map((x) => ({
              name: x.name,
              amount: x.amount_atomic,
            })),
          });
        }}
        {...p}
      />
    </Elements>
  );
}
