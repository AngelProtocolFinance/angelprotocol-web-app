import { GasPrice } from "@cosmjs/stargate";
import { IS_TEST } from "./env";

export enum denoms {
  axlusdc = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo = "halo",
}

export const symbols = {
  [denoms.axlusdc]: "axlUSDC",
  [denoms.halo]: "HALO",
};

// TODO: uni-3 and juno-1 have diff gas prices for fee display only,
// actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing
// NOTE: use "High" fee setting on JUNO testnet, otherwise transactions will fail
export const GAS_PRICE = IS_TEST
  ? GasPrice.fromString("0.025ujunox")
  : GasPrice.fromString("0.0025ujuno");
