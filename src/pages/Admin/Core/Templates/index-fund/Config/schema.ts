import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber, requiredTokenAmount } from "schemas/number";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  fundingGoal: requiredTokenAmount,
  fundRotation: requiredPositiveNumber,
}) as ObjectSchema<FormValues>;
