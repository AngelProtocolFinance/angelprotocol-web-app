import * as Yup from "yup";
import { FormValues, Redeem } from "./types";
import { SchemaShape } from "schemas/types";
import { FIELD_PRECISION } from "./Fields/Field";

type Key = keyof FormValues | keyof Redeem;
const balance: Key = "balance";

const redeem: SchemaShape<Redeem> = {
  amount: Yup.number().when(balance, (balance: number, schema) => {
    const min = 9 * Math.pow(10, -FIELD_PRECISION - 1);
    return schema
      .min(min, "invalid amount")
      .test(
        "enough balance",
        "not enough balance",
        (amount: number) => balance > amount
      );
  }),
};

const redeems = Yup.array(Yup.object().shape(redeem));

const shape: SchemaShape<FormValues> = {
  liquid: redeems,
  locked: redeems,
};

export const schema = Yup.object(shape);
