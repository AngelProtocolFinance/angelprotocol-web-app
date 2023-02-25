import { requiredPositiveNumber } from "@giving/schemas/number";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { CW3ConfigValues, FormCW3Config } from "@giving/types/pages/admin";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<CW3ConfigValues<FormCW3Config>> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  duration: requiredPositiveNumber,
};

export const schema = Yup.object(shape);
