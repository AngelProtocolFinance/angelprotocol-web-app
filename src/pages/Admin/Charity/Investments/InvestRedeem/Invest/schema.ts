import * as Yup from "yup";
import { Balance, FormValues, Investment } from "./types";
import { SchemaShape } from "schemas/types";
import { AccountType } from "types/contracts";
import { FIELD_PRECISION } from "./Fields/Field";

type Keys = keyof FormValues;
type Investments = Investment[];

const type: Keys = "type";
const balance: Keys = "balance";

type InvestmentSchema = (investments: Investments) => SchemaShape<Investment>;
const investment: InvestmentSchema = (investments) => ({
  //access $balance context
  amount: Yup.number().when([`$${balance}`, type], (...args: any[]) => {
    const [balance, type, schema] = args as [
      Balance,
      AccountType,
      Yup.NumberSchema
    ];

    const total = investments
      .filter((inv) => inv.type === type)
      .reduce((t, inv) => t + inv.amount, 0);

    const min = 9 * Math.pow(10, -FIELD_PRECISION - 1);
    /**
     *  must be greater than 0.{NUM_ZEROS = FIELD_PRECISION}_9.., else be rounded to 0
     *  for precision of 6, must be greater than 0.000_000_9...
     */
    return schema.min(min, "invalid amount").test(
      "enough surplus",
      "not enough balance", //when test evaluates to false
      () => balance[type] >= total
    );
  }),
});

const shape: SchemaShape<FormValues> = {
  investments: Yup.lazy(
    (_v: Investments) =>
      Yup.array(Yup.object().shape(((v: Investments) => investment(v))(_v))) //supply latest inputs
  ),
};
export const schema = Yup.object(shape);
