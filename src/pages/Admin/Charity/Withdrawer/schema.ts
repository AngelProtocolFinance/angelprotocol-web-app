import * as Yup from "yup";
import { Amount, WithdrawValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredAddress } from "schemas/string";

type TVal = Amount["value"];
type TBal = Amount["balance"];

const balKey: keyof Amount = "balance";

const amount: SchemaShape<Amount> = {
  value: Yup.lazy((val: TVal) =>
    val === ""
      ? Yup.string().required("required")
      : tokenConstraint.when(balKey, (balance: TBal, schema) =>
          schema.test("balance test", "not enough balance", () => {
            return +balance >= +val; //if false test fails
          })
        )
  ),
};

const shape: SchemaShape<WithdrawValues> = {
  amounts: Yup.array(Yup.object().shape(amount)),
  beneficiary: requiredAddress("beneficiary"),
  //add other vault fields here
};

export const schema = Yup.object(shape);
