import { junoChainId, terraChainId } from "constants/chainIDs";

export const isJunoChain = (chainId: string | undefined) =>
  chainId === junoChainId;

export const isTerraChain = (chainId: string | undefined) =>
  chainId === terraChainId;
