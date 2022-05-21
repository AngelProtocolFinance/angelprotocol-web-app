import * as Yup from "yup";
import { tokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { WithdrawValues } from "./types";

const withdrawShape: SchemaShape<WithdrawValues> = {
  anchor1_amount: tokenAmount,
  anchor2_amount: tokenAmount,
  beneficiary: requiredAddress("beneficiary"),
  //add other vault fields here
};

export const withdrawSchema = Yup.object(withdrawShape);
