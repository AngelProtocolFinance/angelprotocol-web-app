import * as Yup from "yup";
import { VaultFields } from "./types";
export const schema = Yup.object().shape({
  [VaultFields.anchor1_amount]: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("invalid: must be a number")
    .positive("invalid: must be greater than zero ")
    .test("decimals", "invalid: up to 6 decimals only", test_digits),
  [VaultFields.anchor2_amount]: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("invalid: must be a number")
    .positive("invalid: must be greater than zero ")
    .test("decimals", "invalid: up to 6 decimals only", test_digits),
  //add other vault fields here
});

function test_digits(number: number | undefined) {
  return /^\d+(\.\d{1,6})?$/.test((number || "0") as string);
}
