import { richTextContent } from "schemas/shape";
import { requiredString } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { ObjectSchema, object } from "yup";
import { MAX_CHARS, fileObj } from "../common";
import { FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  title: requiredString.trim(),
  description: richTextContent({ maxChars: MAX_CHARS, required: true }),
  image: fileObj,
}) as ObjectSchema<FV>;
