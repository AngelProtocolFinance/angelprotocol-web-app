import * as Yup from "yup";
import { tokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { VaultFieldIds } from "./types";

export const schema = Yup.object().shape({
  [VaultFieldIds.anchor1_amount]: tokenAmount,
  [VaultFieldIds.anchor2_amount]: tokenAmount,
  beneficiary: requiredAddress("wallet"),
  //add other vault fields here
});
