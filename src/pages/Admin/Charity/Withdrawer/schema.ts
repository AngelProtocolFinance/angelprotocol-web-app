import * as Yup from "yup";
import { Amount, WithdrawValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TNetwork = WithdrawValues["network"];

const balKey: keyof Amount = "balance";
const netKey: keyof WithdrawValues = "network";
const amountsKey: keyof WithdrawValues = "amounts";

const amount: SchemaShape<Amount> = {
  value: Yup.lazy((val: TVal) =>
    val === ""
      ? Yup.string() //required collected on _amount
      : tokenConstraint.when(balKey, (balance: TBal, schema) =>
          schema.test("balance test", "not enough balance", () => {
            return +balance >= +val; //if false test fails
          })
        )
  ),
};

const shape: SchemaShape<WithdrawValues> = {
  amounts: Yup.array(Yup.object().shape(amount)),
  _amounts: Yup.string().when(amountsKey, (amounts: Amount[], schema) =>
    schema.test("at least one is valid", "", () =>
      amounts.some((amount) => amount.value !== "")
    )
  ),
  beneficiary: Yup.string().when(netKey, (network: TNetwork) =>
    requiredWalletAddr(network)
  ),
  //add other vault fields here
};

export const schema = Yup.object(shape);
