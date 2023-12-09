import { ObjectSchema, number, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { optionType } from "schemas/shape";

export const schema = object<any, SchemaShape<FormValues>>({
  endowmentID: number()
    .typeError("must be a number")
    .integer("must be integer")
    .min(1),
  status: optionType(),
}) as ObjectSchema<FormValues>;
