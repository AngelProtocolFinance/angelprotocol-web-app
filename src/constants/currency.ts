import { Denoms } from "types/lists";
import haloIcon from "assets/icons/currencies/halo_outline.png";
import junoIcon from "assets/icons/currencies/juno.svg";
import unknownTokenIcon from "assets/icons/currencies/token.svg";
import usdcIcon from "assets/icons/currencies/usdc.svg";
import { IS_TEST } from "./env";

export const denoms: { [key in Denoms]: string } = IS_TEST
  ? {
      axlusdc: "uusdx",
      halo: "halo",
      juno: "ujunox",
    }
  : {
      axlusdc:
        "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
      halo: "halo",
      juno: "ujuno",
    };

export const symbols: { [key in Denoms]: string } = IS_TEST
  ? {
      axlusdc: "USDC",
      halo: "HALO",
      juno: "JUNOX",
    }
  : {
      axlusdc: "USDC",
      halo: "HALO",
      juno: "JUNO",
    };

//need to update this to expected result of `{balance:{}}` query
//better include that data in said query

type CoinAsset = { name: string; icon: string };

const _assets: { [index: string]: CoinAsset } = {
  [denoms.juno]: { icon: junoIcon, name: symbols.juno },
  [denoms.axlusdc]: { icon: usdcIcon, name: symbols.juno },
  [denoms.halo]: { icon: haloIcon, name: symbols.halo },
};

export const coinAsset = new Proxy(_assets, {
  get(target, key: string) {
    return target[key] ?? { icon: unknownTokenIcon, name: "Token" };
  },
});
