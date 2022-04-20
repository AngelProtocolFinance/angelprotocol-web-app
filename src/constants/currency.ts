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
}
export enum SupportedCurrencies {
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
};

type TokenSymbols = `${denoms}`;
export type Token = {
  logo: string;
  symbol: TokenSymbols;
};
