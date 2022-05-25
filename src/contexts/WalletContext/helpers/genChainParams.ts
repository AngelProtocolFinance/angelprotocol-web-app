import { ethers } from "ethers";
import { ChainParams, NativeTokenWithBalance } from "../types";

export function getChainParamsFromCoin(
  coin: NativeTokenWithBalance
): ChainParams {
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
