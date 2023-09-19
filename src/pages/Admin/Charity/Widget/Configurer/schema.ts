import { ObjectSchema, number, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";

export const schema = object<any, SchemaShape<FormValues>>({
  endowment: object<any, SchemaShape<FormValues["endowment"]>>({
    id: number().notOneOf([0], "required"),
  }),
}) as ObjectSchema<FormValues>;
