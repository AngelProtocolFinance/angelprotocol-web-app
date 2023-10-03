import { ObjectSchema, object } from "yup";
import { InvestFormValues } from "../types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";

export const schema = object<any, SchemaShape<InvestFormValues>>({
  token: object(tokenShape()),
}) as ObjectSchema<InvestFormValues>;
