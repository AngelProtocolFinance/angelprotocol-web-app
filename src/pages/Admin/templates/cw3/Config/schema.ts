import { ObjectSchema, object } from "yup";
import { CW3ConfigValues, FormCW3Config } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../../constants";

export const schema = object<any, SchemaShape<CW3ConfigValues<FormCW3Config>>>({
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
}) as ObjectSchema<CW3ConfigValues<FormCW3Config>>;
