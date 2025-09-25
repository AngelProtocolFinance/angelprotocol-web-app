import type { SubmitStep } from "../types";
import { Crypto } from "./crypto";
import { ChariotCheckout } from "./daf-checkout";
import { Stocks } from "./stocks";
import { StripeCheckout } from "./stripe-checkout";

export function Submit(props: SubmitStep) {
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
    return <ChariotCheckout details={details} {...rest} />;
  }

  const { details, ...rest } = props;
  return <Stocks details={details} {...rest} />;
}
