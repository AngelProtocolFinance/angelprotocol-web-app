import haloIcon from "assets/icons/currencies/halo_outline.png";
import junoIcon from "assets/icons/currencies/juno.svg";
import unknownTokenIcon from "assets/icons/currencies/token.svg";
import usdcIcon from "assets/icons/currencies/usdc.svg";

export enum denoms {
  uusdx = "uusdx",
  axlusdc = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo = "halo_contract_addr", //replace with halo contract addr
  ujuno = "ujuno",
  ujunox = "ujunox",
  dusd = "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
}

const _symbols: { [key in denoms]: string } = {
  [denoms.uusdx]: "USDC",
  [denoms.axlusdc]: "USDC",
  [denoms.halo]: "HALO",
  [denoms.ujuno]: "JUNO",
  [denoms.ujunox]: "JUNOX",
  [denoms.dusd]: "DUSD",
};

export const symbols: { [index: string]: string } = new Proxy(_symbols, {
  get(target, key: denoms) {
    return target[key] ?? "TOKEN";
  },
});

type CoinAsset = { symbol: string; icon: string };
const _tokens: { [key in denoms]: CoinAsset } = {
  [denoms.uusdx]: { icon: usdcIcon, symbol: _symbols.uusdx },
  [denoms.axlusdc]: { icon: usdcIcon, symbol: _symbols[denoms.axlusdc] },
  [denoms.dusd]: { icon: usdcIcon, symbol: _symbols[denoms.dusd] },
  [denoms.halo]: { icon: haloIcon, symbol: _symbols[denoms.halo] },
  [denoms.ujuno]: { icon: junoIcon, symbol: _symbols.ujuno },
  [denoms.ujunox]: { icon: junoIcon, symbol: _symbols.ujunox },
};

export const tokens: { [index: string]: CoinAsset } = new Proxy(_tokens, {
  get(target, key: denoms) {
    return target[key] ?? { icon: unknownTokenIcon, symbol: "Token" };
  },
});
