import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber, requiredTokenAmount } from "schemas/number";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  fundingGoal: requiredTokenAmount,
  fundRotation: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
