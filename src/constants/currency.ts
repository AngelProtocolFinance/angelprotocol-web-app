import { Denoms } from "@types-lists";
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

export const currency_text: { [key in Denoms]: string } = {
  uluna: "LUNA",
  uaud: "AUD",
  ucad: "CAD",
  uchf: "CHF",
  ucny: "CNY",
  udkk: "DKK",
  ueur: "EUR",
  ugbp: "GBP",
  uhkd: "HKD",
  uidr: "IDR",
  uinr: "INR",
  ujpy: "JPY",
  ukrw: "KRT",
  umnt: "MNT",
  unok: "NOK",
  uphp: "PHP",
  usdr: "SDR",
  usek: "SEK",
  usgd: "SGD",
  uthb: "THB",
  uusd: "UST",
  coin: "COIN",
  btc: "BTC",
  ether: "ETH",
  bnb: "BNB",
  wei: "WEI",
  sol: "SOL",
  uatom: "ATOM",
  uhalo: "HALO",
};

export const currency_icons: { [key in Denoms]: string } = {
  uluna: luna,
  uaud: token,
  ucad: token,
  uchf: token,
  ucny: token,
  udkk: token,
  ueur: token,
  ugbp: token,
  uhkd: token,
  uidr: token,
  uinr: token,
  ujpy: token,
  ukrw: krt,
  umnt: mnt,
  unok: token,
  uphp: token,
  usdr: sdt,
  usek: token,
  usgd: token,
  uthb: token,
  uusd: ust,
  coin: token,
  ether: ether,
  bnb: bnb,
  wei: token,
  btc: btc,
  sol: sol,
  uatom: atom,
  uhalo: halo,
};
