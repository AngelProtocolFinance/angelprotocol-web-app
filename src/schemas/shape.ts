import { OptionType } from "types/components";
import type { TokenWithAmount as TWA } from "types/tx";
import {
  NumberSchema,
  ObjectSchema,
  StringSchema,
  lazy,
  number,
  object,
  string,
} from "yup";
import { requiredString } from "./string";
import { testTokenDigits } from "./tests";
import { SchemaShape } from "./types";

export const stringNumber = (
  str: (schema: StringSchema) => StringSchema,
  num: (schema: NumberSchema) => NumberSchema
) =>
  lazy((v) =>
    !v && typeof v !== "number"
      ? str(string().trim())
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
