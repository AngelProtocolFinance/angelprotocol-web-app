import type { Chain, Chains, CosmosChainID, EVMChainID } from "types/chain";
import { IS_TEST } from "./env";

const baseProxyURL = "https://59vigz9r91.execute-api.us-east-1.amazonaws.com";
//mainnets
export const polygon: Chain = {
  isTest: false,
  id: "137",
  brand: "polygon",
  name: "Polygon",
  rpc: baseProxyURL + "/polygon",
  lcd: "",
  blockExplorer: "https://polygonscan.com",
  nativeToken: {
    id: "137",
    symbol: "MATIC",
    decimals: 18,
    coinGeckoId: "matic-network",
  },
};

export const ethereum: Chain = {
  isTest: false,
  id: "1",
  brand: "ethereum",
  name: "Ethereum",
  rpc: baseProxyURL + "/ethereum",
  lcd: "",
  blockExplorer: "https://etherscan.io",
  nativeToken: {
    id: "1",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const arbitrum: Chain = {
  isTest: false,
  id: "42161",
  brand: "arbitrum",
  name: "Arbitrum One",
  rpc: baseProxyURL + "/arbitrum",
  lcd: "",
  blockExplorer: "https://arbiscan.io",
  nativeToken: {
    id: "42161",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const binance: Chain = {
  isTest: false,
  id: "56",
  brand: "binance",
  name: "Binance",
  rpc: baseProxyURL + "/bsc",
  lcd: "",
  blockExplorer: "https://bscscan.com",
  nativeToken: {
    id: "56",
    symbol: "BNB",
    decimals: 18,
    coinGeckoId: "binancecoin",
  },
};

export const juno: Chain = {
  isTest: false,
  id: "juno-1",
  brand: "juno",
  name: "Juno",
  lcd: "https://juno-api.polkachu.com",
  rpc: "https://juno-rpc.polkachu.com",
  blockExplorer: "https://www.mintscan.io/juno",
  nativeToken: {
    id: "ujuno",
    symbol: "JUNO",
    decimals: 6,
    coinGeckoId: "juno-network",
  },
};

export const terraMainnet: Chain = {
  isTest: false,
  id: "phoenix-1",
  brand: "terra",
  name: "Terra",
  lcd: "https://phoenix-lcd.terra.dev",
  rpc: "",
  blockExplorer: "https://finder.terra.money/mainnet",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
    coinGeckoId: "terra-luna-2",
  },
};

//testnets
export const polygonAmoy: Chain = {
  isTest: true,
  id: "80002",
  brand: "polygonAmoy",
  name: "Polygon Amoy Testnet",
  rpc: baseProxyURL + "/polygonAmoy",
  lcd: "",
  blockExplorer: "https://amoy.polygonscan.com",
  nativeToken: {
    id: "80002",
    symbol: "MATIC",
    decimals: 18,
    coinGeckoId: "matic-network",
  },
};

export const sepolia: Chain = {
  isTest: true,
  id: "11155111",
  brand: "sepolia",
  name: "Ethereum Sepolia Testnet",
  rpc: baseProxyURL + "/sepolia",
  lcd: "",
  blockExplorer: "https://sepolia.etherscan.io",
  nativeToken: {
    id: "11155111",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const arbitrumSepolia: Chain = {
  isTest: true,
  id: "421614",
  brand: "arbitrum",
  name: "Arbitrum Sepolia",
  rpc: baseProxyURL + "/arbitrum-test",
  lcd: "",
  blockExplorer: "https://sepolia.arbiscan.io",
  nativeToken: {
    id: "421614",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const binanceTestnet: Chain = {
  isTest: true,
  id: "97",
  brand: "binance",
  name: "Binance Testnet",
  rpc: baseProxyURL + "/bsc-test",
  lcd: "",
  blockExplorer: "https://testnet.bscscan.com",
  nativeToken: {
    id: "97",
    symbol: "BNB",
    decimals: 18,
    coinGeckoId: "binancecoin",
  },
};

export const terraTestnet: Chain = {
  isTest: true,
  id: "pisco-1",
  brand: "terra",
  name: "Terra Pisco",
  lcd: "https://pisco-lcd.terra.dev",
  rpc: "",
  blockExplorer: "https://finder.terra.money/testnet",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
    coinGeckoId: "terra-luna-2",
  },
};

export const ripple: Chain = {
  isTest: IS_TEST,
  id: "xrp",
  brand: "ripple",
  name: "Ripple",
  lcd: "",
  rpc: "",
  blockExplorer: "",
  nativeToken: {
    //TODO: change to ap wallet
    id: "r3PDXzXky6gboMrwurmSCiUyhzdrFyAbfu",
    symbol: "XRP",
    decimals: 0,
    coinGeckoId: "ripple",
  },
};

export const bitcoin: Chain = {
  isTest: IS_TEST,
  id: "btc",
  brand: "bitcoin",
  name: "Bitcoin",
  lcd: "",
  rpc: "",
  blockExplorer: "",
  nativeToken: {
    //TODO: change to ap wallet
    id: "bc1q9ll6ngymkla8mnk5fq6dwlhgr3yutuxvg3whz5",
    symbol: "BTC",
    decimals: 0,
    coinGeckoId: "bitcoin",
  },
};

export const solana: Chain = {
  isTest: IS_TEST,
  id: "solana",
  brand: "solana",
  name: "Solana",
  lcd: "",
  rpc: "",
  blockExplorer: "",
  nativeToken: {
    //TODO: change to ap wallet
    id: "5ZuyExCSj9595QehogSVEf2SqMhgXGKhV9Cs9zWp6JBA",
    symbol: "SOL",
    decimals: 0,
    coinGeckoId: "solana",
  },
};



export const chainList: Chain[] = [
  polygon,
  ethereum,
  arbitrum,
  binance,
  juno,
  terraMainnet,
  sepolia,
  polygonAmoy,
  arbitrumSepolia,
  binanceTestnet,
  terraTestnet,
];

export const chains: Chains = chainList.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {} as Chains
);

export const EVMChains: EVMChainID[] = [
  "1",
  "137",
  "42161",
  "421614",
  "11155111",
  "56",
  "80002",
  "97",
];
export const cosmosChains: CosmosChainID[] = ["juno-1", "uni-6"];
