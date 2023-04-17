import { TokenWithAmount } from "types/slices";
import haloIcon from "assets/icons/currencies/halo_outline.png";
import junoIcon from "assets/icons/currencies/juno.svg";
import unknownTokenIcon from "assets/icons/currencies/token.svg";
import usdcIcon from "assets/icons/currencies/usdc.svg";
import { IS_TEST } from "./env";

export enum denoms {
  uusdx = "uusdx",
  axlusdc = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
  halo = "halo_contract_addr", //replace with halo contract addr
  ujuno = "ujuno",
  ujunox = "ujunox",
}

export const junoDenom = IS_TEST ? denoms.ujunox : denoms.ujuno;
export const axlUSDCDenom = IS_TEST ? denoms.uusdx : denoms.axlusdc;

const _symbols: { [key in denoms]: string } = {
  [denoms.uusdx]: "USDC",
  [denoms.axlusdc]: "USDC",
  [denoms.halo]: "HALO",
  [denoms.ujuno]: "JUNO",
  [denoms.ujunox]: "JUNOX",
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
  [denoms.halo]: { icon: haloIcon, symbol: _symbols[denoms.halo] },
  [denoms.ujuno]: { icon: junoIcon, symbol: _symbols.ujuno },
  [denoms.ujunox]: { icon: junoIcon, symbol: _symbols.ujunox },
};

export const tokens: { [index: string]: CoinAsset } = new Proxy(_tokens, {
  get(target, key: denoms) {
    return target[key] ?? { icon: unknownTokenIcon, symbol: "Token" };
  },
});

export const fiatTokens: TokenWithAmount[] = [
  {
    min_donation_amnt: 30,
    symbol: "USD",
    approved: true,
    decimals: 2,
    logo: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    name: "US DOLLAR",
    token_id: "USD",
    type: "fiat",
    balance: Number.MAX_VALUE,
    amount: "",
  },
  {
    min_donation_amnt: 30,
    symbol: "EUR",
    approved: true,
    decimals: 2,
    logo: "https://cdn-icons-png.flaticon.com/512/206/206593.png",
    name: "EURO",
    token_id: "EUR",
    type: "fiat",
    balance: Number.MAX_VALUE,
    amount: "",
  },
  {
    min_donation_amnt: 30,
    symbol: "GBP",
    approved: true,
    decimals: 2,
    logo: "https://cdn-icons-png.flaticon.com/512/206/206592.png",
    name: "GREAT BRITAIN POUND",
    token_id: "GBP",
    type: "fiat",
    balance: Number.MAX_VALUE,
    amount: "",
  },
  {
    min_donation_amnt: 30,
    symbol: "AUD",
    approved: true,
    decimals: 2,
    logo: "https://cdn-icons-png.flaticon.com/512/206/206618.png",
    name: "AUSTRALIAN DOLLAR",
    token_id: "AUD",
    type: "fiat",
    balance: Number.MAX_VALUE,
    amount: "",
  },
];
