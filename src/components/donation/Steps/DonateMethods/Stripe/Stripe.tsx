import { Props } from "./types";
import Form from "./Form";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Stripe(props: Props) {
  return <Form {...props} />;
}
