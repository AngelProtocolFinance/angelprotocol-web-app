import type { SubmitStep } from "../types";
import Crypto from "./Crypto";
import DAFCheckout from "./DAFCheckout";
import Stocks from "./Stocks";
import StripeCheckout from "./StripeCheckout";

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
