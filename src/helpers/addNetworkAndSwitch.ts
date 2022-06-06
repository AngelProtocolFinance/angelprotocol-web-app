import { ethers } from "ethers";
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

export async function switchToNetwork(
  intStrChainId: string,
  providerId: ProviderId
) {
  const provider = getProvider(providerId);
  await provider?.request({
    method: EIPMethods.wallet_switchEthereumChain,
    params: [{ chainId: "0x" + (+intStrChainId).toString(16) }],
  });
  //let caller handle error
}
