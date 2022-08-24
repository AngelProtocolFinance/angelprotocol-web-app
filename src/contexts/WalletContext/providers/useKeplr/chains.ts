import { ChainInfo } from "@keplr-wallet/types";

// is used only when running on Juno Testnet
export const juno_test_chain_info: ChainInfo = {
  //FROM: https://github.com/CosmosContracts/junoswap-asset-list/blob/main/chain_info.json
  // modified denoms
  chainId: "uni-3",
  chainName: "Juno Testnet",
  rpc: "https://rpc.uni.juno.deuslabs.fi",
  rest: "https://lcd.uni.juno.deuslabs.fi",
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
