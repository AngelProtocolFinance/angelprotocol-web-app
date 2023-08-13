import { ObjectSchema, object } from "yup";
import { CW3ConfigValues, FormReviewCW3Config } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../../constants";

type FV = CW3ConfigValues<FormReviewCW3Config>;

export const schema = object<any, SchemaShape<FV>>({
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
}) as ObjectSchema<FV>;
