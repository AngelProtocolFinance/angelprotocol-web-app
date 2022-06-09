import bnb from "assets/icons/currencies/bnb.png";
import ether from "assets/icons/currencies/ether.png";
import halo from "assets/icons/currencies/halo_outline.png";
import luna from "assets/icons/currencies/luna.svg";
import ustc from "assets/icons/currencies/ustc.png";
import coin from "assets/icons/currencies/coin.png";

export enum denoms {
  bnb = "bnb",
  ether = "ether",
  uusd = "uusd",
  uhalo = "uhalo",
  uluna = "uluna",
}

type Currency = {
  denom: denoms;
  ticker: string;
  icon: string;
};

const _CURRENCIES: Record<denoms, Currency> = {
  [denoms.bnb]: {
    denom: denoms.bnb,
    ticker: "BNB",
    icon: bnb,
  },
  [denoms.ether]: {
    denom: denoms.ether,
    ticker: "ETH",
    icon: ether,
  },
  [denoms.uhalo]: {
    denom: denoms.uhalo,
    ticker: "HALO",
    icon: halo,
  },
  [denoms.uusd]: {
    denom: denoms.uusd,
    ticker: "USTC",
    icon: ustc,
  },
  [denoms.uluna]: {
    denom: denoms.uluna,
    ticker: "LUNC",
    icon: luna,
  },
};

export const CURRENCIES = new Proxy(_CURRENCIES, {
  get(currencies, denom: denoms) {
    return (
      currencies[denom] || { denom, ticket: denom.toUpperCase(), icon: coin }
    );
  },
});

export const MAIN_DENOM = denoms.uusd;
