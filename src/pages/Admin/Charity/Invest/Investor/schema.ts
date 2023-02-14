import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  token: Yup.object().shape(tokenShape),
});
