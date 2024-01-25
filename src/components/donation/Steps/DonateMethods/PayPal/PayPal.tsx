import { Props } from "./types";
import Form from "./Form";

// Inspiration for the wiring implementation:
// https://developer.paypal.com/docs/checkout/standard/integrate/#link-integratefrontend
export default function PayPal(props: Props) {
  return <Form {...props} />;
}
