import { SubmitStep } from "slices/donation";
import Crypto from "./Crypto";
import PaypalCheckout from "./PaypalCheckout";
import StripeCheckout from "./StripeCheckout";

export default function Submit(props: SubmitStep) {
  if (props.details.method === "crypto") {
    const { details, ...rest } = props;
    return <Crypto details={details} {...rest} />;
  }

  if (props.details.method === "paypal") {
    const { details, ...rest } = props;
    return <PaypalCheckout details={details} {...rest} />;
  }

  if (props.details.method === "stripe") {
    const { details, ...rest } = props;
    return <StripeCheckout details={details} {...rest} />;
  }

  //TODO: stocks
  return <></>;
}
