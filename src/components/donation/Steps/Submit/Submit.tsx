import { SubmitStep } from "slices/donation";
import Crypto from "./Crypto";
import StripeCheckout from "./StripeCheckout";

export default function Submit(props: SubmitStep) {
  if (props.details.method === "crypto") {
    const { details, ...rest } = props;
    return <Crypto details={details} {...rest} />;
  }

  const { details, ...rest } = props;
  return <StripeCheckout details={details} {...rest} />;
}
