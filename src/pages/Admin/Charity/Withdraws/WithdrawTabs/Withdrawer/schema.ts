import * as Yup from "yup";
import { Amount, WithdrawValues as WV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";

type TVal = Amount["value"];
type TBal = Amount["balance"];
type TNetwork = WV["network"];
type TFees = WV["fees"];

const balKey: keyof Amount = "balance";
const netKey: keyof WV = "network";
const amountsKey: keyof WV = "amounts";
const heightKey: keyof WV = "height";
const feesKey: keyof WV = "fees";

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
              `minimum ${fees[network as "ethereum" | "binance"]} USDC`,
              () =>
                network === chainIds.juno
                  ? true
                  : network === chainIds.ethereum
                  ? +val >= 40
                  : +val >= 20
            )
        )
  ),
});

const shape: SchemaShape<WV> = {
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
  reason: Yup.string().when(heightKey, (height, schema) =>
    height > 0 ? schema.required("reason required") : schema.optional()
  ),
};

export const schema = Yup.object(shape);
