import type {
  OptionType,
  RichTextContent,
  ITokenFv as TWD,
} from "types/components";
import {
  type NumberSchema,
  type ObjectSchema,
  type StringSchema,
  ValidationError,
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

type Key = keyof TWD;
type Min = TWD["min"];
const min_key: Key = "min";

export const token_shape = (withMin = true): SchemaShape<TWD> => ({
  id: string().required("select token"),
  amount: str_num(
    (s) => s.required("required"),
    (num) =>
      num
        .positive("invalid: must be greater than zero ")
        .when([min_key], (values, schema) => {
          const [min_amount] = values as [Min];
          return withMin && !!min_amount
            ? schema.min(min_amount || 0, "less than minimum")
            : schema;
        })
        .test((val, context) => {
          if (!val) return true;
          const num_decimals = val.toString().split(".").at(1)?.length ?? 0;
          const precision = context.parent.precision;
          if (num_decimals <= precision) return true;
          return new ValidationError(
            `can't be more than ${precision} decimals`,
            precision,
            context.path
          );
        })
  ),
});

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
