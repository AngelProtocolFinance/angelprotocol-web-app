import * as Yup from "yup";
import { Amount, FV, FormMeta } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { feeData } from "./helpers";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TChainId = FV["destinationChainId"];

const balKey: keyof Amount = "balance";
const metaKey = "$meta"; //context key
const destinationChainIdKey: keyof FV = "destinationChainId";
const amountsKey: keyof FV = "amounts";

const amount: (
  destinationChainId: TChainId,
  meta: FormMeta
) => SchemaShape<Amount> = (destinationChainId, meta) => ({
  value: Yup.lazy((withdrawAmount: TVal) => {
    const { totalFee } = feeData({
      ...meta,
      destinationChainId,
      withdrawAmount: withdrawAmount ? +withdrawAmount : 0,
    });

    return withdrawAmount === ""
      ? Yup.string() //required collected on _amount
      : tokenConstraint.when(balKey, (balance: TBal, schema) =>
          schema
            .test("enough balance", "not enough balance", () => {
              return +balance >= +withdrawAmount;
            })
            .test(
              "must be greater than fee",
              /**
               * NOTE: this is on the assumption that endow TOH would just be USDC
               * for other tokens, must first get dollar amount
               */
              `minimum ${totalFee} USDC`,
              () => +withdrawAmount >= totalFee
            )
        );
  }),
});

const shape: SchemaShape<FV> = {
  amounts: Yup.array().when(
    [destinationChainIdKey, metaKey],
    (...args: any[]) => {
      const [network, fees, schema] = args as [TChainId, FormMeta, any];
      return schema.of(Yup.object().shape(amount(network, fees)));
    }
  ),
  //test if at least one amount is filled
  _amounts: Yup.string().when(amountsKey, (amounts: Amount[], schema) =>
    schema.test("at least one is filled", "", () =>
      amounts.some((amount) => amount.value !== "")
    )
  ),
  beneficiaryWallet: Yup.string().when(
    [destinationChainIdKey, metaKey],
    (...args: any[]) => {
      const [network, meta, schema] = args as [TChainId, FormMeta, any];
      return meta.accountType === "liquid"
        ? requiredWalletAddr(network)
        : schema;
    }
  ),
};

export const schema = Yup.object(shape);
