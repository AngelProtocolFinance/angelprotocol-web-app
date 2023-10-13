import { CustomChainConfig } from "@web3auth/base";
import { mumbai, polygon } from "constants/chains-v2";

export const chainConfig: { [key: string]: CustomChainConfig } = {
  [polygon.id]: {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: polygon.rpc,
    displayName: polygon.name,
    blockExplorer: polygon.blockExplorer,
    ticker: polygon.nativeToken.symbol,
    tickerName: polygon.nativeToken.symbol,
  },
  [mumbai.id]: {
    chainNamespace: "eip155",
    chainId: "0x89",
    rpcTarget: mumbai.rpc,
    displayName: mumbai.name,
    blockExplorer: mumbai.blockExplorer,
    ticker: mumbai.nativeToken.symbol,
    tickerName: mumbai.nativeToken.symbol,
  },
};

export const WEB3AUTH_LOGO = "https://web3auth.io/images/w3a-L-Favicon-1.svg";
