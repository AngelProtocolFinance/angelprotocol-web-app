import { SchemaShape, tokenShape } from "@ap/schemas";
import * as Yup from "yup";
import { FormValues } from "./types";

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  token: Yup.object().shape(tokenShape),
});
