import type { RichTextContent } from "types/components";
import {
  type NumberSchema,
  type ObjectSchema,
  type StringSchema,
  lazy,
  mixed,
  number,
  object,
  string,
} from "yup";
import type { SchemaShape } from "./types";

/**
 * No need to trim the value, as Yup's cast when calling `number()`
 * parses the value ignoring leading/trailing whitespaces.
 *
 * See https://github.com/jquense/yup?tab=readme-ov-file#number
 */
export const str_num = (
  str: (schema: StringSchema) => StringSchema,
  num: (schema: NumberSchema) => NumberSchema
) =>
  lazy((v) =>
    !v && typeof v !== "number"
      ? str(string())
      : num(number().typeError("must be a number"))
  );

export function schema<T extends object>(shape: SchemaShape<T>) {
  return object<any, SchemaShape<object /** internal */>>(
    shape
  ) as ObjectSchema<T>;
}

export function richtext_content(
  options: {
    maxChars?: number;
    required?: boolean;
  } = {}
) {
  const { maxChars, required = false } = options;

  let schema = mixed<RichTextContent>();

  if (maxChars != null) {
    schema = schema.test({
      name: "must be below character limit",
      message: `max length is ${maxChars} chars`,
      test: (content) => (content?.length || 0) <= maxChars,
    });
  }
  if (required) {
    schema = schema.test({
      name: "required",
      message: "required",
      test: (content) => !!content?.value,
    });
  }

  return schema;
}
