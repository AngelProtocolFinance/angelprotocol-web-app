import { ProviderId } from "contexts/WalletContext/types";
import { ChainParams } from "types/ethereum";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { getProvider } from "helpers/getProvider";
import { EIPMethods } from "constants/ethereum";

export default async function addNetworkAndSwitch(wallet: WalletState) {
  const provider = getProvider(wallet.providerId);
  await provider?.request({
    method: EIPMethods.wallet_addEthereumChain,
    params: [getChainParams(wallet)],
  });
  //let caller catch error
}

function getChainParams({ chain }: WalletState): ChainParams {
  return {
    chainId: toHexChainId(chain.chain_id),
    blockExplorerUrls: [chain.block_explorer_url],
    chainName: chain.name,
    iconUrls: [chain.native_currency.logo],
    nativeCurrency: {
      name: chain.native_currency.name,
      symbol: chain.native_currency.symbol,
      decimals: chain.native_currency.decimals,
    },
    rpcUrls: [chain.rpc_url],
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
