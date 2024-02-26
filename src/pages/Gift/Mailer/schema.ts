import { ObjectSchema, object, string } from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredString } from "schemas/string";
import { richTextContent } from "schemas/shape";

export const schema = object<any, SchemaShape<FV>>({
  purchaser: requiredString,
  recipient: object<any, SchemaShape<FV["recipient"]>>({
    name: requiredString,
    email: requiredString.email("invalid email"),
  }),
  message: richTextContent(),
}) as ObjectSchema<FV>;
