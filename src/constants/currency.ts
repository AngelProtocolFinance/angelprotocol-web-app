import atom from "assets/icons/currencies/atom.png";
import bnb from "assets/icons/currencies/bnb.png";
import btc from "assets/icons/currencies/btc.png";
import ether from "assets/icons/currencies/ether.png";
import halo from "assets/icons/currencies/halo_outline.png";
import krt from "assets/icons/currencies/krt.svg";
import luna from "assets/icons/currencies/luna.svg";
import mnt from "assets/icons/currencies/mnt.svg";
import sdt from "assets/icons/currencies/sdt.svg";
import sol from "assets/icons/currencies/sol.svg";
import token from "assets/icons/currencies/token.svg";
import ust from "assets/icons/currencies/ust.svg";

export enum denoms {
  uluna = "uluna",
  uaud = "uaud",
  ucad = "ucad",
  uchf = "uchf",
  ucny = "ucny",
  udkk = "udkk",
  ueur = "ueur",
  ugbp = "ugbp",
  uhkd = "uhkd",
  uidr = "uidr",
  uinr = "uinr",
  ujpy = "ujpy",
  ukrw = "ukrw",
  umnt = "umnt",
  unok = "unok",
  uphp = "uphp",
  usdr = "usdr",
  usek = "usek",
  usgd = "usgd",
  uthb = "uthb",
  uusd = "uusd",
  ether = "ether",
  bnb = "bnb",
  wei = "wei",
  btc = "btc",
  sol = "sol",
  uatom = "uatom",
  coin = "coin",
  uhalo = "uhalo",
  ANC = "ANC",
  ASTRO = "ASTRO",
  MIR = "MIR",
  MARS = "MARS",
  MINE = "MINE",
  PRISM = "PRISM",
  xPRISM = "xPRISM",
  bETH = "bETH",
  bLUNA = "bLUNA",
  LunaX = "LunaX",
}

export enum SupportedDenoms {
  uluna = "uluna",
  uusd = "uusd",
  ANC = "ANC",
  MIR = "MIR",
  MARS = "MARS",
  ASTRO = "ASTRO",
  MINE = "MINE",
  PRISM = "PRISM",
  bLUNA = "bLUNA",
  bETH = "bETH",
  LunaX = "LunaX",
  xPRISM = "xPRISM",
}

export const currency_text: { [key in denoms]: string } = {
  [denoms.uluna]: "LUNA",
  [denoms.uaud]: "AUD",
  [denoms.ucad]: "CAD",
  [denoms.uchf]: "CHF",
  [denoms.ucny]: "CNY",
  [denoms.udkk]: "DKK",
  [denoms.ueur]: "EUR",
  [denoms.ugbp]: "GBP",
  [denoms.uhkd]: "HKD",
  [denoms.uidr]: "IDR",
  [denoms.uinr]: "INR",
  [denoms.ujpy]: "JPY",
  [denoms.ukrw]: "KRT",
  [denoms.umnt]: "MNT",
  [denoms.unok]: "NOK",
  [denoms.uphp]: "PHP",
  [denoms.usdr]: "SDR",
  [denoms.usek]: "SEK",
  [denoms.usgd]: "SGD",
  [denoms.uthb]: "THB",
  [denoms.uusd]: "UST",
  [denoms.coin]: "COIN",
  [denoms.btc]: "BTC",
  [denoms.ether]: "ETH",
  [denoms.bnb]: "BNB",
  [denoms.wei]: "WEI",
  [denoms.sol]: "SOL",
  [denoms.uatom]: "ATOM",
  [denoms.uhalo]: "HALO",
  [denoms.ANC]: "ANC",
  [denoms.ASTRO]: "ASTRO",
  [denoms.MIR]: "MIR",
  [denoms.MARS]: "MARS",
  [denoms.MINE]: "MINE",
  [denoms.PRISM]: "PRISM",
  [denoms.xPRISM]: "xPRISM",
  [denoms.bETH]: "bETH",
  [denoms.bLUNA]: "bLUNA",
  [denoms.LunaX]: "LunaX",
};

export const currency_icons: { [key in denoms]: string } = {
  [denoms.uluna]: luna,
  [denoms.uaud]: token,
  [denoms.ucad]: token,
  [denoms.uchf]: token,
  [denoms.ucny]: token,
  [denoms.udkk]: token,
  [denoms.ueur]: token,
  [denoms.ugbp]: token,
  [denoms.uhkd]: token,
  [denoms.uidr]: token,
  [denoms.uinr]: token,
  [denoms.ujpy]: token,
  [denoms.ukrw]: krt,
  [denoms.umnt]: mnt,
  [denoms.unok]: token,
  [denoms.uphp]: token,
  [denoms.usdr]: sdt,
  [denoms.usek]: token,
  [denoms.usgd]: token,
  [denoms.uthb]: token,
  [denoms.uusd]: ust,
  [denoms.coin]: token,
  [denoms.ether]: ether,
  [denoms.bnb]: bnb,
  [denoms.wei]: token,
  [denoms.btc]: btc,
  [denoms.sol]: sol,
  [denoms.uatom]: atom,
  [denoms.uhalo]: halo,
  [denoms.ANC]: "https://whitelist.anchorprotocol.com/logo/ANC.png",
  [denoms.ASTRO]: "https://astroport.fi/astro_logo.svg",
  [denoms.MIR]: "https://whitelist.mirror.finance/icon/MIR.png",
  [denoms.MARS]: "https://marsprotocol.io/mars_logo_colored.svg",
  [denoms.MINE]: "https://assets.pylon.rocks/logo/MINE.png",
  [denoms.PRISM]: "https://app.astroport.fi/tokens/prism.png",
  [denoms.xPRISM]: " https://app.astroport.fi/tokens/xPRISM.svg",
  [denoms.bETH]: "https://app.astroport.fi/tokens/bETH.svg",
  [denoms.bLUNA]: "https://whitelist.anchorprotocol.com/logo/bLUNA.png",
  [denoms.LunaX]: "https://app.astroport.fi/tokens/lunax.svg",
};

type TokenSymbols = `${denoms}`;

export type Cw20Token = {
  logo: string;
  symbol: TokenSymbols;
  cw20_contract: string;
  testnet_cw20_contract?: string;
  native_denom?: never;
};

export type NativeToken = {
  logo: string;
  symbol: TokenSymbols;
  native_denom: denoms.uluna | denoms.uusd;
  cw20_contract?: never;
  testnet_cw20_contract?: never;
};

export type Token = Cw20Token | NativeToken;

export const supported_denoms = Object.keys(SupportedDenoms) as denoms[];
