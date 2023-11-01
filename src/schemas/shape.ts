import * as Yup from "yup";
import { SchemaShape } from "./types";
import type { TokenWithAmount as TWA } from "types/tx";
import { OptionType } from "components/Selector";
import { tokenConstraint } from "./number";
import { requiredString } from "./string";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
type Bal = TWA["balance"];
const minKey: Key = "min_donation_amnt";
const balKey: Key = "balance";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? requiredString
      : tokenConstraint.when([minKey, balKey], (values, schema) => {
          const [minAmount, balance] = values as [Min, Bal];
          return withMin && !!minAmount
            ? schema
                .min(minAmount || 0, `amount must be at least ${minAmount}`)
                .max(balance, "not enough balance")
            : schema.max(balance, "not enough balance");
        })
  ),
});

export const optionType = ({ required } = { required: false }) =>
  Yup.object<any, SchemaShape<OptionType<string>>>({
    label: required ? requiredString : Yup.string(),
    value: required ? requiredString : Yup.string(),
  });
