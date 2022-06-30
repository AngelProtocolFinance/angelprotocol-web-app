import bnb from "assets/icons/currencies/bnb.png";
import ether from "assets/icons/currencies/ether.png";
import halo from "assets/icons/currencies/halo_outline.png";
import juno from "assets/icons/currencies/juno.svg";
import luna from "assets/icons/currencies/luna.png";
import ust from "assets/icons/currencies/ust.svg";
import { IS_TEST } from "./env";

export const denoms = {
  uluna: "uluna",
  uusd: "uusd",
  bnb: "bnb",
  wei: "wei",
  halo: "halo",
  ujunox: "ujunox",
  ujuno: "ujuno",
};

export const denomIcons = {
  uluna: luna,
  bnb: bnb,
  wei: ether,
  halo: halo,
  uusd: ust,
  ujunox: juno,
  ujuno: juno,
};

export const MAIN_DENOM = IS_TEST ? denoms.ujunox : denoms.ujuno;
