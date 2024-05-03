import { richTextContent } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, date, object } from "yup";
import { MAX_CHARS, fileObj } from "../common";
import type { FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  date: date().typeError("invalid date"),
  description: richTextContent({ maxChars: MAX_CHARS }),
  title: requiredString.trim(),
  media: fileObj,
}) as ObjectSchema<FV>;
