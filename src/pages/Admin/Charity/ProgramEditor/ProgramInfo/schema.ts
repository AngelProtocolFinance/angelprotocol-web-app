import { richTextContent, stringNumber } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, object } from "yup";
import { MAX_CHARS, fileObj } from "../common";
import type { FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  title: requiredString.trim(),
  description: richTextContent({ maxChars: MAX_CHARS, required: true }),
  image: fileObj,
  targetRaise: stringNumber(
    (s) => s,
    (num) => num.positive("must be greater than 0")
  ),
}) as ObjectSchema<FV>;
