import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { VaultFieldIds } from "types/shared/widthdraw";
import { tokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { WithdrawValues } from "./types";

const withdrawShape: SchemaShape<WithdrawValues> = {
  [VaultFieldIds.anchor1_amount]: tokenAmount,
  [VaultFieldIds.anchor2_amount]: tokenAmount,
  beneficiary: requiredAddress("beneficiary"),
  //add other vault fields here
};

export const withdrawSchema = Yup.object(withdrawShape);
