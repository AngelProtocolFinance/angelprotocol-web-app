import * as Yup from "yup";
import { WithdrawValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";

const withdrawShape: SchemaShape<WithdrawValues> = {
  anchor1_amount: tokenAmount,
  anchor2_amount: tokenAmount,
  beneficiary: requiredAddress("beneficiary"),
  //add other vault fields here
};

export const withdrawSchema = Yup.object(withdrawShape);
