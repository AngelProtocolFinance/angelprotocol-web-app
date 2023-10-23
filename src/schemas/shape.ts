import * as Yup from "yup";
import { SchemaShape } from "./types";
import type { TokenWithAmount as TWA } from "types/tx";
import { tokenConstraint } from "./number";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
const minKey: Key = "min_donation_amnt";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
  amount: Yup.lazy((amount: string) =>
    amount === ""
      ? Yup.string().required("required")
      : tokenConstraint.when([minKey], (values, schema) => {
          const [minAmount] = values as [Min];
          return withMin && !!minAmount
            ? schema.min(minAmount || 0, `amount must be at least ${minAmount}`)
            : schema;
        })
  ),
});
