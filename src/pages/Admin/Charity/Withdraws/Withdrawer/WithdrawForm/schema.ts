import { ObjectSchema, array, lazy, number, object, string } from "yup";
import { Amount, FV, FormMeta } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { feeData } from "./helpers";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TChainId = FV["destinationChainId"];
type TBeneficiaryType = FV["beneficiaryType"];

const balKey: keyof Amount = "balance";
const metaKey = "$meta"; //context key
const beneficiaryTypeKey: keyof FV = "beneficiaryType";
const destinationChainIdKey: keyof FV = "destinationChainId";
const amountsKey: keyof FV = "amounts";

const amount: (
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

export const schema = object<any, SchemaShape<FV>>({
  amounts: array().when([destinationChainIdKey, metaKey], (values, schema) => {
    const [network, fees] = values as [TChainId, FormMeta];
    return schema.of(object(amount(network, fees)));
  }),
  //test if at least one amount is filled
  _amounts: string().when(amountsKey, ([amounts], schema) =>
    schema.test("at least one is filled", "", () =>
      (amounts as Amount[]).some((amount) => amount.value !== "")
    )
  ),
  beneficiaryWallet: string().when(
    [destinationChainIdKey, beneficiaryTypeKey, metaKey],
    (values, schema) => {
      const [network, beneficiaryType] = values as [
        TChainId,
        TBeneficiaryType,
        FormMeta,
      ];
      return beneficiaryType === "wallet"
        ? requiredWalletAddr(network)
        : schema;
    }
  ),
  beneficiaryEndowmentId: number().when(
    [beneficiaryTypeKey],
    ([beneficiaryType], schema) => {
      return (beneficiaryType as TBeneficiaryType) === "endowment"
        ? schema
            .typeError("invalid number")
            .positive("can't be negative")
            .integer("must be whole number")
        : string();
    }
  ),
}) as ObjectSchema<FV>;
