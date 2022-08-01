import { GasPrice } from "@cosmjs/stargate";
import { IS_TEST } from "./env";

export enum denoms {
  uusd = "uusd",
  halo = "halo",
}

// TODO: uni-3 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
export const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");
