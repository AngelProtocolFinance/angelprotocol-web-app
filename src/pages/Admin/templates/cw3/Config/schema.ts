import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredPositiveNumber } from "schemas/number";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  requireExecution: Yup.boolean(),
};

export const schema = Yup.object(shape);
