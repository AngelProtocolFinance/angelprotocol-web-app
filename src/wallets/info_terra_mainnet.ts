import { ChainInfo } from "@keplr-wallet/types";
import { chainIDs } from "contracts/types";
import { currency_text, denoms } from "constants/currency";
import { terra_lcds, terra_rpcs } from "constants/urls";

const uusd_info = {
  coinDenom: currency_text[denoms.uusd],
  coinMinimalDenom: denoms.uusd,
  coinDecimals: 6,
  // coinGeckoId: coingecko_ids[denoms.uusd],
};

export const info_terra_mainnet: ChainInfo = {
  chainId: chainIDs.mainnet,
  chainName: "Terra (UST)",
  rpc: terra_rpcs[chainIDs.mainnet],
  rest: terra_lcds[chainIDs.mainnet],
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
