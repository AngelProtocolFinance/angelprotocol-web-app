import { SchemaShape, requiredPositiveNumber } from "@ap/schemas";
import * as Yup from "yup";
import { CW3ConfigValues, FormReviewCW3Config } from "@/pages/Admin/types";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<CW3ConfigValues<FormReviewCW3Config>> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
