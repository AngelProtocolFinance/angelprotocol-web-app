import type { OptionType, RichTextContent } from "types/components";
import type { TokenWithAmount as TWA } from "types/tx";
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
import { requiredString } from "./string";
import { testTokenDigits } from "./tests";
import type { SchemaShape } from "./types";

/**
 * No need to trim the value, as Yup's cast when calling `number()`
 * parses the value ignoring leading/trailing whitespaces.
 *
 * See https://github.com/jquense/yup?tab=readme-ov-file#number
 */
export const stringNumber = (
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

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
const minKey: Key = "min_donation_amnt";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
  token_id: string().required("select token"),
  amount: stringNumber(
    (s) => s.required("required"),
    (num) =>
      num
        .positive("invalid: must be greater than zero ")
        .when([minKey], (values, schema) => {
          const [minAmount] = values as [Min];
          return withMin && !!minAmount
            ? schema.min(minAmount || 0, `amount must be at least ${minAmount}`)
            : schema;
        })
        .test(
          "max precision",
          "must not be greater than 6 digits",
          testTokenDigits
        )
  ),
});

export const optionType = ({ required } = { required: false }) =>
  object<any, SchemaShape<OptionType<string>>>({
    label: required ? requiredString : string(),
    value: required ? requiredString : string(),
  });

export function richTextContent(
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
