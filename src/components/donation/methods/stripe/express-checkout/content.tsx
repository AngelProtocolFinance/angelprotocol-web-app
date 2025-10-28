import { ExpressCheckoutElement } from "@stripe/react-stripe-js";

export function Content({ classes = "" }) {
  return (
    <ExpressCheckoutElement
      className={classes}
      onConfirm={(x) => {
        console.log(x);
      }}
      onClick={(x) => {
        console.log(x);
        x.resolve();
        return x;
      }}
    />
  );
}
