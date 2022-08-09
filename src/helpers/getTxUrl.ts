import { UnimplementedNetworkError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";

const blockExplorers = IS_TEST
  ? {
      //id replaced with testnet counterpart
      [chainIds.binance]: "https://testnet.bscscan.com/tx",
      [chainIds.ethereum]: "https://kovan.etherscan.io/tx",
      [chainIds.juno]: "https://testnet.ping.pub/juno/tx",
      [chainIds.terra]: "https://finder.terra.money/testnet/tx",
    }
  : {
      //id replaced with mainnet counterpart
      [chainIds.binance]: "https://bscscan.com/tx",
      [chainIds.ethereum]: "https://etherscan.io/tx",
      [chainIds.juno]: "https://mintscan.io/juno/tx",
      [chainIds.terra]: "https://finder.terra.money/mainnet/tx",
    };

export default function getTxUrl(chainId: string, txhash: string) {
  const blockExplorer = blockExplorers[chainId];
  if (!blockExplorer) {
    throw new UnimplementedNetworkError(chainId);
  }
  return `${blockExplorer}/${txhash}`;
}
