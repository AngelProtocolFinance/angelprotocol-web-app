import { richTextContent } from "schemas/shape";
import { requiredString } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { ObjectSchema, date, object } from "yup";
import { MAX_CHARS, fileObj } from "../common";
import { FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  date: date().typeError("invalid date"),
  description: richTextContent({ maxChars: MAX_CHARS }),
  title: requiredString.trim(),
  media: fileObj,
}) as ObjectSchema<FV>;
