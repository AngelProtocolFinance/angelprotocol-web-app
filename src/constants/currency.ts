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
  ether = "ether",
  bnb = "bnb",
  wei = "wei",
  btc = "btc",
  sol = "sol",
  uatom = "uatom",
  coin = "coin",
  uhalo = "uhalo",
}

type Currency = {
  denom: denoms;
  ticker: string;
  icon: string;
};

export const CURRENCIES: Record<denoms, Currency> = {
  [denoms.uluna]: {
    denom: denoms.uluna,
    ticker: "LUNA",
    icon: luna,
  },
  [denoms.uaud]: {
    denom: denoms.uaud,
    ticker: "AUD",
    icon: token,
  },
  [denoms.ucad]: {
    denom: denoms.ucad,
    ticker: "CAD",
    icon: token,
  },
  [denoms.uchf]: {
    denom: denoms.uchf,
    ticker: "CHF",
    icon: token,
  },
  [denoms.ucny]: {
    denom: denoms.ucny,
    ticker: "CNY",
    icon: token,
  },
  [denoms.udkk]: {
    denom: denoms.udkk,
    ticker: "DKK",
    icon: token,
  },
  [denoms.ueur]: {
    denom: denoms.ueur,
    ticker: "EUR",
    icon: token,
  },
  [denoms.ugbp]: {
    denom: denoms.ugbp,
    ticker: "GBP",
    icon: token,
  },
  [denoms.uhkd]: {
    denom: denoms.uhkd,
    ticker: "HKD",
    icon: token,
  },
  [denoms.uidr]: {
    denom: denoms.uidr,
    ticker: "IDR",
    icon: token,
  },
  [denoms.uinr]: {
    denom: denoms.uinr,
    ticker: "INR",
    icon: token,
  },
  [denoms.ujpy]: {
    denom: denoms.ujpy,
    ticker: "JPY",
    icon: token,
  },
  [denoms.ukrw]: {
    denom: denoms.ukrw,
    ticker: "KRT",
    icon: krt,
  },
  [denoms.umnt]: {
    denom: denoms.umnt,
    ticker: "MNT",
    icon: mnt,
  },
  [denoms.unok]: {
    denom: denoms.unok,
    ticker: "NOK",
    icon: token,
  },
  [denoms.uphp]: {
    denom: denoms.uphp,
    ticker: "PHP",
    icon: token,
  },
  [denoms.usdr]: {
    denom: denoms.usdr,
    ticker: "SDR",
    icon: sdt,
  },
  [denoms.usek]: {
    denom: denoms.usek,
    ticker: "SEK",
    icon: token,
  },
  [denoms.usgd]: {
    denom: denoms.usgd,
    ticker: "SGD",
    icon: token,
  },
  [denoms.uthb]: {
    denom: denoms.uthb,
    ticker: "THB",
    icon: token,
  },
  [denoms.coin]: {
    denom: denoms.coin,
    ticker: "COIN",
    icon: token,
  },
  [denoms.btc]: {
    denom: denoms.btc,
    ticker: "BTC",
    icon: btc,
  },
  [denoms.ether]: {
    denom: denoms.ether,
    ticker: "ETH",
    icon: ether,
  },
  [denoms.bnb]: {
    denom: denoms.bnb,
    ticker: "BNB",
    icon: bnb,
  },
  [denoms.wei]: {
    denom: denoms.wei,
    ticker: "WEI",
    icon: token,
  },
  [denoms.sol]: {
    denom: denoms.sol,
    ticker: "SOL",
    icon: sol,
  },
  [denoms.uatom]: {
    denom: denoms.uatom,
    ticker: "ATOM",
    icon: atom,
  },
  [denoms.uhalo]: {
    denom: denoms.uhalo,
    ticker: "HALO",
    icon: halo,
  },
};

export const MAIN_DENOM = denoms.uluna;
