import type { SubmitStep } from "../types";
import Crypto from "./crypto";
import DAFCheckout from "./daf-checkout";
import Stocks from "./stocks";
import StripeCheckout from "./stripe-checkout";

export default function Submit(props: SubmitStep) {
  if (props.details.method === "crypto") {
    const { details, ...rest } = props;
    return <Crypto details={details} {...rest} />;
  }

  if (props.details.method === "stripe") {
    const { details, ...rest } = props;
    return <StripeCheckout details={details} {...rest} />;
  }

  if (props.details.method === "daf") {
    const { details, ...rest } = props;
    return <DAFCheckout details={details} {...rest} />;
  }

  const { details, ...rest } = props;
  return <Stocks details={details} {...rest} />;
}
