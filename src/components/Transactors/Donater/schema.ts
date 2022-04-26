import * as Yup from "yup";
import { DonateValues } from "@types-component/donater";
import { SchemaShape } from "@types-schema";
import { requiredTokenAmount } from "schemas/number";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
};
export const schema = Yup.object().shape(shape);
