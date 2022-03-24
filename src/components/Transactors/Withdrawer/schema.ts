import { addressSchema } from "schemas/schemas";
import * as Yup from "yup";
import { VaultFieldIds } from "./types";

const amountSchema = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : Yup.number()
        .typeError("invalid: must be a number")
        .positive("invalid: must be greater than zero ")
        .test("decimals", "invalid: up to 6 decimals only", test_digits)
);

export const schema = Yup.object().shape({
  [VaultFieldIds.anchor1_amount]: amountSchema,
  [VaultFieldIds.anchor2_amount]: amountSchema,
  beneficiary: addressSchema("wallet"),
  //add other vault fields here
});

function test_digits(number: number | undefined) {
  return /^\d+(\.\d{1,6})?$/.test((number || "0") as string);
}
