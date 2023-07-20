import * as Yup from "yup";
import { Amount, FV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { fee } from "./helpers";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TChainId = FV["destinationChainId"];
type TBridgeFees = FV["bridgeFees"];
type TAccountType = FV["accountType"];

const balKey: keyof Amount = "balance";
const chainIdKey: keyof FV = "destinationChainId";
const accountTypeKey: keyof FV = "accountType";
const amountsKey: keyof FV = "amounts";
const bridgeFeesKey: keyof FV = "bridgeFees";

const amount: (
  network: TChainId,
  bridgeFees: TBridgeFees
) => SchemaShape<Amount> = (network, fees) => ({
  value: Yup.lazy((val: TVal) =>
    val === ""
      ? Yup.string() //required collected on _amount
      : tokenConstraint.when(balKey, (balance: TBal, schema) =>
          schema
            .test("enough balance", "not enough balance", () => {
              return +balance >= +val;
            })
            .test(
              "must be greater than fee",
              /**
               * NOTE: this is on the assumption that endow TOH would just be USDC
               * for other tokens, must first get dollar amount
               */
              `minimum ${fee(network, fees)} USDC`,
              () => +val >= fee(network, fees)
            )
        )
  ),
});

const shape: SchemaShape<FV> = {
  amounts: Yup.array().when([chainIdKey, bridgeFeesKey], (...args: any[]) => {
    const [network, fees, schema] = args as [TChainId, TBridgeFees, any];
    return schema.of(Yup.object().shape(amount(network, fees)));
  }),
  //test if at least one amount is filled
  _amounts: Yup.string().when(amountsKey, (amounts: Amount[], schema) =>
    schema.test("at least one is filled", "", () =>
      amounts.some((amount) => amount.value !== "")
    )
  ),
  beneficiaryWallet: Yup.string().when(
    [chainIdKey, accountTypeKey],
    (...args: any[]) => {
      const [network, accountType, schema] = args as [
        TChainId,
        TAccountType,
        any
      ];
      return accountType === "liquid" ? requiredWalletAddr(network) : schema;
    }
  ),
};

export const schema = Yup.object(shape);
