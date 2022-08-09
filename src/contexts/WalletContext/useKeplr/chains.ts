import { ChainInfo } from "@keplr-wallet/types";
import { chainIds } from "constants/chainIds";
import { LCDs, RPCs } from "constants/urls";

export const juno_test: ChainInfo = {
  //FROM: https://github.com/CosmosContracts/junoswap-asset-list/blob/main/chain_info.json
  // modified denoms
  chainId: chainIds.juno,
  chainName: "Juno Testnet",
  rpc: RPCs.juno,
  rest: LCDs.juno,
  stakeCurrency: {
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "juno",
    bech32PrefixAccPub: "junopub",
    bech32PrefixValAddr: "junovaloper",
    bech32PrefixValPub: "junovaloperpub",
    bech32PrefixConsAddr: "junovalcons",
    bech32PrefixConsPub: "junovalconspub",
  },
  currencies: [
    {
      coinDenom: "JUNOX",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "JUNOX",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0.0025,
    average: 0.01,
    high: 0.025,
  },
  features: ["cosmwasm", "ibc-transfer"],
};
