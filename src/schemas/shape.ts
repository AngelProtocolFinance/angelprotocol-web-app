import { lazy, object, string } from "yup";
import { SchemaShape } from "./types";
import type { TokenWithAmount as TWA } from "types/tx";
import { OptionType } from "types/utils";
import { tokenConstraint } from "./number";
import { requiredString } from "./string";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
const minKey: Key = "min_donation_amnt";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
  token_id: string().required("select token"),
  amount: lazy((amount: string) =>
    amount === ""
      ? requiredString
      : tokenConstraint.when([minKey], (values, schema) => {
          const [minAmount] = values as [Min];
          return withMin && !!minAmount
            ? schema.min(minAmount || 0, `amount must be at least ${minAmount}`)
            : schema;
        })
  ),
});

export const optionType = ({ required } = { required: false }) =>
  object<any, SchemaShape<OptionType<string>>>({
    label: required ? requiredString : string(),
    value: required ? requiredString : string(),
  });
