import * as Yup from "yup";
import { WithdrawValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { requiredAddress } from "schemas/string";

const shape: SchemaShape<WithdrawValues> = {
  amounts: Yup.array(requiredPositiveNumber),
  beneficiary: requiredAddress("beneficiary"),
  //add other vault fields here
};

export const schema = Yup.object(shape);
