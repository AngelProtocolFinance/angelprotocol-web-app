import { richTextContent } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, object } from "yup";
import type { FormValues as FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  purchaser: requiredString.trim(),
  recipient: object<any, SchemaShape<FV["recipient"]>>({
    name: requiredString.trim(),
    email: requiredString.trim().email("invalid email"),
  }),
  message: richTextContent(),
}) as ObjectSchema<FV>;
