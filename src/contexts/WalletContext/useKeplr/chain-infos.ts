import { ChainInfo } from "@keplr-wallet/types";
import { StaticRegistry, _chains } from "constants/chains";

const id: keyof StaticRegistry = "uni-5";
const chain = _chains[id];

export const junoTestnet: ChainInfo = {
  //FROM: https://github.com/CosmosContracts/junoswap-asset-list/blob/main/chain_info.json
  // modified denoms
  chainId: id,
  chainName: chain.name,
  rpc: chain.rpc,
  rest: chain.lcd,
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
