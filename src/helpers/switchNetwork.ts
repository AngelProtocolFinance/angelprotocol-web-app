import { ethers } from "ethers";
import { EIPMethods } from "contexts/WalletContext/constants";
import {
  ChainParams,
  NativeToken,
  ProviderId,
} from "contexts/WalletContext/types";
import { getProvider } from "helpers/getProvider";

export default async function switchNetwork(
  coin: NativeToken,
  providerId: ProviderId
) {
  try {
    const provider = getProvider(providerId);
    await provider?.request({
      method: EIPMethods.wallet_addEthereumChain,
      params: [getChainParamsFromCoin(coin)],
    });
  } catch (err: any) {
    console.error(err);
  }
}

function getChainParamsFromCoin(coin: NativeToken): ChainParams {
  return {
    chainId: ethers.BigNumber.from(coin.chainId).toHexString(),
    blockExplorerUrls: [coin.blockExplorerUrl],
    chainName: coin.chainName,
    iconUrls: [coin.logo],
    nativeCurrency: {
      name: coin.symbol,
      symbol: coin.symbol,
      decimals: coin.decimals,
    },
    rpcUrls: [coin.rpcUrl],
  };
}
