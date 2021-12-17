import { ChainInfo } from "@keplr-wallet/types";
import { chainIDs } from "contracts/types";
import { terra_lcds } from "constants/urls";
import { currency_text, denoms } from "constants/currency";
import { coin_types } from "./coin_types";
import { coingecko_ids } from "./coingecko_ids";

const luna_info = {
  coinDenom: currency_text[denoms.uluna],
  coinMinimalDenom: denoms.uluna,
  coinDecimals: 6,
  coinGeckoId: coingecko_ids[denoms.uluna],
};
const uusd_info = {
  coinDenom: currency_text[denoms.uusd],
  coinMinimalDenom: denoms.uusd,
  coinDecimals: 6,
  coinGeckoId: coingecko_ids[denoms.uusd],
};

export const info_terra_testnet: ChainInfo = {
  chainId: chainIDs.testnet,
  chainName: "Terra (USD)",
  rpc: terra_lcds[chainIDs.testnet],
  rest: terra_lcds[chainIDs.testnet],
  stakeCurrency: luna_info,
  bip44: {
    coinType: coin_types[denoms.uluna],
  },
  bech32Config: {
    bech32PrefixAccAddr: "terra",
    bech32PrefixAccPub: "terra",
    bech32PrefixValAddr: "terravaloper",
    bech32PrefixValPub: "terravaloperpub",
    bech32PrefixConsAddr: "terravalcons",
    bech32PrefixConsPub: "terravalconspub",
  },
  currencies: [luna_info, uusd_info],
  feeCurrencies: [uusd_info],
  coinType: coin_types[denoms.uluna],
};
