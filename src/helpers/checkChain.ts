import {
  binanceChainId,
  ethereumChainId,
  junoChainId,
  terraChainId,
} from "constants/chainIDs";

export const isEvmChainId = (chainId: string | undefined) =>
  chainId === ethereumChainId || chainId === binanceChainId;

export const isJunoChain = (chainId: string | undefined) =>
  chainId === junoChainId;

export const isTerraChain = (chainId: string | undefined) =>
  chainId === terraChainId;
