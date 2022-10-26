import * as Yup from "yup";
import { DonateValues, TokenWithAmount as TWA } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
type Bal = TWA["balance"];
const minKey: Key = "min_donation_amnt";
const balKey: Key = "balance";

const tokenShape: SchemaShape<TWA> = {
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([minKey, balKey], (...args: any[]) => {
          const [minAmount, balance, schema] = args as [Min, Bal, any];
          return schema
            .min(minAmount || 0, `amount must be at least ${minAmount}`)
            .max(balance, "not enough balance");
        })
  ),
};

const shape: SchemaShape<DonateValues> = {
  token: Yup.object().shape(tokenShape),
  isAgreedToTerms: Yup.boolean().isTrue(),
};

export const schema = Yup.object().shape(shape);
