import * as Yup from "yup";
import { FormValues, Investment } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";

const allocationShape: SchemaShape<Investment> = {
  amount: requiredPositiveNumber,
};
const shape: SchemaShape<FormValues> = {
  investments: Yup.array(Yup.object().shape(allocationShape)),
  //add other vault fields here
};
export const schema = Yup.object(shape);
