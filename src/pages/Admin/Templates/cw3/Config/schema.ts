import * as Yup from "yup";
import { CW3ConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../proposalShape";

const shape: SchemaShape<CW3ConfigValues> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
