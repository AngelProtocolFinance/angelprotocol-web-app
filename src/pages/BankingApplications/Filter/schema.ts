import { optionType } from "schemas/shape";
import { SchemaShape } from "schemas/types";
import { ObjectSchema, object, string } from "yup";
import { FormValues } from "./types";

export const schema = object<any, SchemaShape<FormValues>>({
  endowmentID: string().matches(/^(?:[1-9]\d*|)$/, "invalid id"), // int > 0, or ""
  status: optionType(),
}) as ObjectSchema<FormValues>;
