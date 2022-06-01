import { ethers } from "ethers";
import { ProviderId } from "contexts/WalletContext/types";
import { ChainParams } from "types/ethereum";
import { Token } from "types/server/aws";
import { getProvider } from "helpers/getProvider";
import { EIPMethods } from "constants/ethereum";

export default async function addNetworkAndSwitch(
  coin: Token,
  providerId: ProviderId
) {
  const provider = getProvider(providerId);
  await provider?.request({
    method: EIPMethods.wallet_addEthereumChain,
    params: [getChainParamsFromCoin(coin)],
  });
  //let caller catch error
}

function getChainParamsFromCoin(coin: Token): ChainParams {
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
