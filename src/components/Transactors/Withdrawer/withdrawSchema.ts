import * as Yup from "yup";
import { VaultFieldIds } from "services/terra/multicall/types";
import { SchemaShape } from "types/schema";
import { WithdrawValues } from "./types";

export const tokenAmount = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : Yup.number()
        .positive("invalid: must be greater than zero ")
        .typeError("invalid: must be a number")
        .test(
          "max precision",
          "must not be greater than 6 digits",
          testTokenDigits
        )
);

const addressSchema = Yup.string()
  .required("address is required")
  .test("is valid", "address format is invalid", testAddress);

const withdrawShape: SchemaShape<WithdrawValues> = {
  [VaultFieldIds.anchor1_amount]: tokenAmount,
  [VaultFieldIds.anchor2_amount]: tokenAmount,
  beneficiary: addressSchema,
  //add other vault fields here
};

export const withdrawSchema = Yup.object(withdrawShape);

function testAddress(address?: string): boolean {
  return !address || /^terra[a-z0-9]{39}$/i.test(address);
}

function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
