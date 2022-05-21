import * as Yup from "yup";
import { CW3ConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../proposalShape";

const cw3ConfigShape: SchemaShape<CW3ConfigValues> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  height: requiredPositiveNumber,
};

export const cw3ConfigSchema = Yup.object(cw3ConfigShape);
