import * as Yup from "yup";
import { Amount, FV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { fee } from "./helpers";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TNetwork = FV["network"];
type TFees = FV["fees"];

const balKey: keyof Amount = "balance";
const netKey: keyof FV = "network";
const endowKey: keyof FV = "endowType";
const amountsKey: keyof FV = "amounts";
const feesKey: keyof FV = "fees";

const amount: (network: TNetwork, fees: TFees) => SchemaShape<Amount> = (
  network,
  fees
) => ({
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
  amounts: Yup.array().when([netKey, feesKey], (...args: any[]) => {
    const [network, fees, schema] = args as [TNetwork, TFees, any];
    return schema.of(Yup.object().shape(amount(network, fees)));
  }),
  //test if at least one amount is filled
  _amounts: Yup.string().when(amountsKey, (amounts: Amount[], schema) =>
    schema.test("at least one is filled", "", () =>
      amounts.some((amount) => amount.value !== "")
    )
  ),
  beneficiary: Yup.string().when(netKey, (network: TNetwork) =>
    requiredWalletAddr(network)
  ),
  reason: Yup.string().when(endowKey, (endowType, schema) =>
    endowType === "charity"
      ? //normal endowments should not be required to provide reason when withdrawing matured funds
        schema.required("reason required")
      : schema.optional()
  ),
};

export const schema = Yup.object(shape);
