import { ObjectSchema, array, lazy, object, string } from "yup";
import { Amount, BaseFormMeta, BaseFormValues } from "../types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { feeData } from "../helpers";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TChainId = FV["destinationChainId"];

const balKey: keyof Amount = "balance";
const metaKey = "$meta"; //context key
const destinationChainIdKey: keyof FV = "destinationChainId";
const amountsKey: keyof FV = "amounts";

const amountSchemaWithFee: (
  destinationChainId: TChainId,
  meta: FormMeta
) => SchemaShape<Amount> = (destinationChainId, meta) => ({
  value: lazy((withdrawAmount: TVal) => {
    const { totalFee } = feeData({
      ...meta,
      destinationChainId,
      withdrawAmount: withdrawAmount ? +withdrawAmount : 0,
    });

    return withdrawAmount === ""
      ? string() //required collected on _amount
      : tokenConstraint.when(balKey, ([balance], schema) =>
          schema
            .test("enough balance", "not enough balance", () => {
              return +(balance as TBal) >= +withdrawAmount;
            })
            .test(
              "must be greater than fee",
              /**
               * NOTE: this is on the assumption that endow TOH would just be USDC
               * for other tokens, must first get dollar amount
               */
              `must be greater than minimum ${totalFee} USDC`,
              () => +withdrawAmount > totalFee
            )
        );
  }),
});

export const amountSchema: SchemaShape<Amount> = {
  value: lazy((withdrawAmount: TVal) => {
    return withdrawAmount === ""
      ? string() //required collected on _amount
      : tokenConstraint.when(balKey, ([balance], schema) =>
          schema.test("enough balance", "not enough balance", () => {
            return +(balance as TBal) >= +withdrawAmount;
          })
        );
  }),
};

export const baseSchema = object<
  any,
  SchemaShape<BaseFormValues & BaseFormMeta>
>({
  //test if at least one amount is filled
  _amounts: string().when(amountsKey, ([amounts], schema) =>
    schema.test("at least one is filled", "", () =>
      (amounts as Amount[]).some((amount) => amount.value !== "")
    )
  ),
});
