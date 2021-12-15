import { ChainInfo } from "@keplr-wallet/types";
import { chains } from "contracts/types";
import { currency_text, denoms } from "constants/currency";

const uusd_info = {
  coinDenom: currency_text[denoms.uusd],
  coinMinimalDenom: denoms.uusd,
  coinDecimals: 6,
  // coinGeckoId: coingecko_ids[denoms.uusd],
};

export const terra_mainnet_rpc =
  "https://columbus-5--rpc--archive.datahub.figment.io/apikey/6a264141abfde52c7f2ac6473e587eff";
export const terra_mainnet_lcd =
  "https://columbus-5--lcd--full.datahub.figment.io/apikey/6a264141abfde52c7f2ac6473e587eff";
export const info_terra_mainnet: ChainInfo = {
  chainId: chains.mainnet,
  chainName: "Terra (UST)",
  rpc: terra_mainnet_rpc,
  rest: terra_mainnet_lcd,
  stakeCurrency: uusd_info,
  bip44: {
    //no cointype for UST BIP44 - just use coin_type of cosmos
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "terra",
    bech32PrefixAccPub: "terra",
    bech32PrefixValAddr: "terravaloper",
    bech32PrefixValPub: "terravaloperpub",
    bech32PrefixConsAddr: "terravalcons",
    bech32PrefixConsPub: "terravalconspub",
  },
  currencies: [uusd_info],
  feeCurrencies: [uusd_info],
  //no cointype for UST BIP44 - just use coin_type of cosmos
  coinType: 118,
};
