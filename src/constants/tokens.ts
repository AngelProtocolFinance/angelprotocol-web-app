const haloIcon = "/icons/currencies/halo_outline.png";
const junoIcon = "/icons/currencies/juno.svg";
const unknownTokenIcon = "/icons/currencies/token.svg";
const usdcIcon = "/icons/currencies/usdc.svg";

export enum denoms {
  uusdx = "uusdx",
  axlusdc = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo = "halo_contract_addr", //replace with halo contract addr
  ujuno = "ujuno",
  ujunox = "ujunox",
  ausdc = "0x2c852e740B62308c46DD29B982FBb650D063Bd07",
  "uusdc" = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
}

const _symbols: { [key in denoms]: string } = {
  [denoms.uusdx]: "USDC",
  [denoms.axlusdc]: "USDC",
  [denoms.halo]: "HALO",
  [denoms.ujuno]: "JUNO",
  [denoms.ujunox]: "JUNOX",
  [denoms.ausdc]: "aUSDC",
  [denoms.uusdc]: "USDC",
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
  [denoms.ausdc]: { icon: usdcIcon, symbol: _symbols[denoms.ausdc] },
  [denoms.uusdc]: { icon: usdcIcon, symbol: _symbols[denoms.uusdc] },
  [denoms.halo]: { icon: haloIcon, symbol: _symbols[denoms.halo] },
  [denoms.ujuno]: { icon: junoIcon, symbol: _symbols.ujuno },
  [denoms.ujunox]: { icon: junoIcon, symbol: _symbols.ujunox },
};

export const tokens: { [index: string]: CoinAsset } = new Proxy(_tokens, {
  get(target, key: denoms) {
    return target[key] ?? { icon: unknownTokenIcon, symbol: "Token" };
  },
});
