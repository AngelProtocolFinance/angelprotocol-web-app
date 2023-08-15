import * as Yup from "yup";
import { SchemaShape } from "./types";
import type { TokenWithAmount as TWA } from "types/slices";
import { tokenConstraint } from "./number";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
type Bal = TWA["balance"];
const minKey: Key = "min_donation_amnt";
const balKey: Key = "balance";
const typeKey: Key = "type";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([minKey, balKey, typeKey], (values, schema) => {
          const [minAmount, balance, type] = values as [Min, Bal, TWA["type"]];
          return withMin &&
            !!minAmount &&
            !(type === "erc20-gift" || type === "evm-native-gift")
            ? schema
                .min(minAmount || 0, `amount must be at least ${minAmount}`)
                .max(balance, "not enough balance")
            : schema.max(balance, "not enough balance");
        })
  ),
});
