import { ProviderId } from "contexts/WalletContext/types";
import { ChainParams } from "types/ethereum";
import { EVMNative } from "types/server/aws";
import { getProvider } from "helpers/getProvider";
import { EIPMethods } from "constants/ethereum";

export default async function addNetworkAndSwitch(
  coin: EVMNative,
  providerId: ProviderId
) {
  const provider = getProvider(providerId);
  await provider?.request({
    method: EIPMethods.wallet_addEthereumChain,
    params: [getChainParamsFromCoin(coin)],
  });
  //let caller catch error
}

function getChainParamsFromCoin(coin: EVMNative): ChainParams {
  return {
    chainId: toHexChainId(coin.chain_id),
    blockExplorerUrls: [coin.block_explorer_url],
    chainName: coin.chain_name,
    iconUrls: [coin.logo],
    nativeCurrency: {
      name: coin.symbol,
      symbol: coin.symbol,
      decimals: coin.decimals,
    },
    rpcUrls: [coin.rpc_url],
  };
}

export async function switchToNetwork(
  intStrChainId: string,
  providerId: ProviderId
) {
  const provider = getProvider(providerId);
  await provider?.request({
    method: EIPMethods.wallet_switchEthereumChain,
    params: [{ chainId: toHexChainId(intStrChainId) }],
  });

  //let caller handle error
}

function toHexChainId(strNumChainId: string) {
  return "0x" + (+strNumChainId).toString(16);
}
