import * as Yup from "yup";
import { VaultFields } from "./types";
export const schema = Yup.object().shape({
  [VaultFields.anchor1_amount]: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .test("max precision", "must not be greater than 6 digits", test_digits),
  [VaultFields.anchor2_amount]: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .test("max precision", "must not be greater than 6 digits", test_digits),
  //add other vault fields here
});

function test_digits(number: number | undefined) {
  return /^\d+(\.\d{1,6})?$/.test((number || "0") as string);
}
