import { ObjectSchema, array, lazy, object, string } from "yup";
import { Amount, WithdrawValues as WV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { fee } from "./helpers";

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
  value: lazy((val: TVal) =>
    val === ""
      ? string() //required collected on _amount
      : tokenConstraint.when(balKey, ([balance], schema) =>
          schema
            .test("enough balance", "not enough balance", () => {
              return +(balance as TBal) >= +val;
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

export const schema = object<any, SchemaShape<WV>>({
  amounts: array().when([netKey, feesKey], (vals, schema) => {
    const [network, fees] = vals as [TNetwork, TFees];
    return schema.of(object(amount(network, fees)));
  }),
  //test if at least one amount is filled
  _amounts: string().when(amountsKey, ([amounts], schema) =>
    schema.test("at least one is filled", "", () =>
      (amounts as Amount[]).some((amount) => amount.value !== "")
    )
  ),
  beneficiary: string().when(netKey, ([network]) =>
    requiredWalletAddr(network as TNetwork)
  ),
  reason: string().when(heightKey, ([height], schema) =>
    height > 0 ? schema.required("reason required") : schema.optional()
  ),
}) as ObjectSchema<WV>;
