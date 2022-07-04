import { ChainInfo } from "@keplr-wallet/types";
import { chainIDs } from "constants/chainIDs";
import { juno_lcds, juno_rpcs } from "constants/urls";

export const juno_test: ChainInfo = {
  //FROM: https://github.com/CosmosContracts/junoswap-asset-list/blob/main/chain_info.json
  // modified denoms
  chainId: chainIDs.juno_test,
  chainName: "Juno Testnet",
  rpc: juno_rpcs[chainIDs.juno_test],
  rest: juno_lcds[chainIDs.juno_test],
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
  features: ["cosmwasm", "stargate", "ibc-transfer"],
};
