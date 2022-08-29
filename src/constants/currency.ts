import { Denoms } from "types/lists";
import junoIcon from "assets/icons/currencies/juno.svg";
import unknownTokenIcon from "assets/icons/currencies/token.svg";
import { IS_TEST } from "./env";

export const denoms: { [key in Denoms]: string } = {
  axlusdc:
    "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo: "halo",
  juno: IS_TEST ? "ujunox" : "ujuno",
};

export const symbols: { [key in Denoms]: string } = {
  axlusdc: "axlUSDC",
  halo: "HALO",
  juno: IS_TEST ? "JUNOX" : "JUNO",
};

//need to update this to expected result of `{balance:{}}` query
//better include that data in said query

type CoinAsset = { name: string; icon: string };
const _assets: { [index: string]: CoinAsset } = {
  [denoms.juno]: { icon: junoIcon, name: symbols.juno },
};

export const coinAsset = new Proxy(_assets, {
  get(target, key: string) {
    return target[key] ?? { icon: unknownTokenIcon, name: "Token" };
  },
});
