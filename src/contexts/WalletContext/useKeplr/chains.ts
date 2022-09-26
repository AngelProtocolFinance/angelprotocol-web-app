import { ChainInfo } from "@keplr-wallet/types";

// is used only when running on Juno Testnet
export const juno_test_chain_info: ChainInfo = {
  //FROM: https://github.com/CosmosContracts/junoswap-asset-list/blob/main/chain_info.json
  // modified denoms
  chainId: "uni-5",
  chainName: "Juno Testnet",
  rpc: "https://rpc.uni.junonetwork.io",
  rest: "https://api.uni.junonetwork.io",
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
      gasPriceStep: {
        low: 0.03,
        average: 0.04,
        high: 0.05,
      },
    },
  ],
  coinType: 118,
  features: ["cosmwasm", "ibc-transfer"],
};
