import * as Yup from "yup";
import { Amount, WithdrawValues as WV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TNetwork = WV["network"];

const balKey: keyof Amount = "balance";
const netKey: keyof WV = "network";
const amountsKey: keyof WV = "amounts";
const isRequiredKey: keyof WV = "isReasonRequired";

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

const shape: SchemaShape<WV> = {
  amounts: Yup.array(Yup.object().shape(amount)),
  //test if at least one amount is filled
  _amounts: Yup.string().when(amountsKey, (amounts: Amount[], schema) =>
    schema.test("at least one is filled", "", () =>
      amounts.some((amount) => amount.value !== "")
    )
  ),
  beneficiary: Yup.string().when(netKey, (network: TNetwork) =>
    requiredWalletAddr(network)
  ),
  reason: Yup.string().when(isRequiredKey, (isRequired, schema) =>
    isRequired ? schema.required("reason required") : schema.optional()
  ),
};

export const schema = Yup.object(shape);
