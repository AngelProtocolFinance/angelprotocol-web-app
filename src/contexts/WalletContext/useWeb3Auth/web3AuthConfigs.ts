import { CustomChainConfig } from "@web3auth/base";
import { chainIDs } from "constants/chains";

type chainConfigType = { [key: string]: CustomChainConfig };

export const chainConfig: chainConfigType = {
  [chainIDs.polygonTest]: {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
    displayName: "Polygon Testnet",
    blockExplorer: "https://polygonscan.com",
    ticker: "MATIC",
    tickerName: "Matic",
  },
  [chainIDs.polygonMain]: {
    chainNamespace: "eip155",
    chainId: "0x89",
    rpcTarget: "https://rpc.ankr.com/polygon",
    displayName: "Polygon Mainnet",
    blockExplorer: "https://polygonscan.com",
    ticker: "MATIC",
    tickerName: "Matic",
  },
};

export const WEB3AUTH_LOGO = "https://web3auth.io/images/w3a-L-Favicon-1.svg";
