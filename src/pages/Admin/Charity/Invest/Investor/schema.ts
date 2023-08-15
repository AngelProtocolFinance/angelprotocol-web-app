import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";

export const schema = object<any, SchemaShape<FormValues>>({
  token: object(tokenShape()),
}) as ObjectSchema<FormValues>;
