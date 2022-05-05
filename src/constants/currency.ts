import atom from "assets/icons/currencies/atom.png";
import bnb from "assets/icons/currencies/bnb.png";
import btc from "assets/icons/currencies/btc.png";
import ether from "assets/icons/currencies/ether.png";
import halo from "assets/icons/currencies/halo_outline.png";
import luna from "assets/icons/currencies/luna.svg";
import sol from "assets/icons/currencies/sol.svg";
import token from "assets/icons/currencies/token.svg";

export enum denoms {
  uluna = "uluna",
  uusd = "uusd",
  wei = "wei",
  bnb = "bnb",
  satoshi = "satoshi",
  lamports = "lamports",
  uatom = "uatom",
  halo = "halo",
}

export const currency_icons: { [index: string]: string } = {
  [denoms.uluna]: luna,
  [denoms.uusd]: ether,
  [denoms.bnb]: bnb,
  [denoms.wei]: token,
  [denoms.bnb]: btc,
  [denoms.lamports]: sol,
  [denoms.uatom]: atom,
  [denoms.halo]: halo,
};
