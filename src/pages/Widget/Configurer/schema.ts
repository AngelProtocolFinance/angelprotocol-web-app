import { SchemaShape } from "schemas/types";
import { ObjectSchema, number, object } from "yup";
import { FormValues } from "./types";

export const schema = object<any, SchemaShape<FormValues>>({
  endowment: object<any, SchemaShape<FormValues["endowment"]>>({
    id: number().notOneOf([0], "required"),
  }),
}) as ObjectSchema<FormValues>;
