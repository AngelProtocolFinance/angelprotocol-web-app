import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  newMemberId: requiredPositiveNumber,
}) as ObjectSchema<FormValues>;
