import * as Yup from "yup";
import { Balance, FormValues, Investment } from "./types";
import { SchemaShape } from "schemas/types";
import { AccountType } from "types/contracts";

type Keys = keyof FormValues;
type Investments = Investment[];

const type: Keys = "type";
const balance: Keys = "balance";

const allocation: (investments: Investments) => SchemaShape<Investment> = (
  investments
) => ({
  //access $balance context
  amount: Yup.number().when([`\$${balance}`, type], (...args: any[]) => {
    const [balance, type, schema] = args as [
      Balance,
      AccountType,
      Yup.NumberSchema
    ];

    const total = investments
      .filter((inv) => inv.type === type)
      .reduce((t, inv) => t + inv.amount, 0);

    return schema
      .typeError("must be a number")
      .moreThan(0, "must be greater than 0")
      .test(
        "enough surplus",
        "not enough balance", //when test evaluates to false
        () => balance[type] - total >= 0
      );
  }),
});

const shape: SchemaShape<FormValues> = {
  investments: Yup.lazy(
    (_v: Investments) =>
      Yup.array(Yup.object().shape(((v: Investments) => allocation(v))(_v))) //supply latest inputs
  ),
};
export const schema = Yup.object(shape);
