import * as Yup from "yup";
import { SchemaShape } from "./types";
import type { TokenWithAmount as TWA } from "types/slices";
import { tokenConstraint } from "./number";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
type Bal = TWA["balance"];
type Gift = TWA["gift"];
const minKey: Key = "min_donation_amnt";
const balKey: Key = "balance";
const giftKey: Key = "gift";

export const tokenShape: SchemaShape<TWA> = {
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([minKey, balKey, giftKey], (...args: any[]) => {
          const [minAmount, balance, gift, schema] = args as [
            Min,
            Bal,
            Gift,
            any
          ];
          return !!minAmount
            ? schema
                .min(minAmount || 0, `amount must be at least ${minAmount}`)
                .max(balance + (gift || 0), "not enough balance")
            : schema.max(balance + (gift || 0), "not enough balance");
        })
  ),
};
