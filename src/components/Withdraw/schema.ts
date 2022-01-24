import * as Yup from "yup";
import { VaultFields } from "./types";
export const schema = Yup.object().shape({
  [VaultFields.anchor1_amount]: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .integer("Amount should not contain decimals"),
  [VaultFields.anchor2_amount]: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .integer("Amount should not contain decimals"),
  //add other vault fields here
});

function test_digits(number: number | undefined) {
  return /^\d+(\.\d{1,2})?$/.test((number || "0") as string);
}
