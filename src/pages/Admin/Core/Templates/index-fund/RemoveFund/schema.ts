import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
};

export const schema = Yup.object(shape);
