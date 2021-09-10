import { Values } from "./Subscriber";

type Errors = { email: string };
export default function validator(values: Values) {
  const errors: Errors = { email: "" };
  if (!values.email) {
    errors.email = "email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "email is invalid";
  } else {
    return {};
  }

  //...
  return errors;
}
