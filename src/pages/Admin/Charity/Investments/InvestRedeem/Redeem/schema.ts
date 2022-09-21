import * as Yup from "yup";
import { FormValues, Redeem } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";

type Key = keyof FormValues | keyof Redeem;
const balance: Key = "balance";
const redeems: Key = "redeems";

const redeem: SchemaShape<Redeem> = {
  amount: Yup.lazy((val: Redeem["amount"]) =>
    val === ""
      ? Yup.string() //at least one required handled in shape.redeems
      : tokenConstraint.when(balance, (balance: Redeem["balance"], schema) =>
          schema.test("enough balance", "not enough balance", () => {
            return balance >= +val;
          })
        )
  ),
};

const shape: SchemaShape<FormValues> = {
  redeems: Yup.array(Yup.object().shape(redeem)),
  //test if at least one amount is filled
  _redeems: Yup.mixed().when(redeems, (redeems: Redeem[], schema) =>
    schema.test("at least one is filled", "", () =>
      redeems.some((r) => r.amount)
    )
  ),
};

export const schema = Yup.object(shape);
/**
 * test(
    "at least one is filled",
    "no redeem amount",
    (redeems) => (redeems as unknown as Redeem[]).some((r: any) => r.amount)
  ),
 */
