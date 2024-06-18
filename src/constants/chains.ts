import type {
  Chains,
  CosmosChainID,
  EVMChainID,
  SupportedChain,
  UnsupportedChain,
  UnsupportedChains,
} from "types/chain";
import { IS_TEST } from "./env";

const baseProxyURL = "https://59vigz9r91.execute-api.us-east-1.amazonaws.com";
//mainnets
export const polygon: SupportedChain = {
  isTest: false,
  id: "137",
  coingeckoPlatformId: "polygon-pos",
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

export const ethereum: SupportedChain = {
  isTest: false,
  id: "1",
  coingeckoPlatformId: "ethereum",
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

export const arbitrum: SupportedChain = {
  isTest: false,
  id: "42161",
  coingeckoPlatformId: "arbitrum-one",
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

export const binance: SupportedChain = {
  isTest: false,
  id: "56",
  coingeckoPlatformId: "binance-smart-chain",
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

export const juno: SupportedChain = {
  isTest: false,
  id: "juno-1",
  coingeckoPlatformId: "juno",
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

export const terraMainnet: SupportedChain = {
  isTest: false,
  id: "phoenix-1",
  coingeckoPlatformId: "terra",
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
export const polygonAmoy: SupportedChain = {
  isTest: true,
  id: "80002",
  brand: "polygonAmoy",
  coingeckoPlatformId: "polygon-pos",
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

export const sepolia: SupportedChain = {
  isTest: true,
  id: "11155111",
  coingeckoPlatformId: "ethereum",
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

export const arbitrumSepolia: SupportedChain = {
  isTest: true,
  id: "421614",
  coingeckoPlatformId: "arbitrum-one",
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

export const binanceTestnet: SupportedChain = {
  isTest: true,
  id: "97",
  coingeckoPlatformId: "binance-smart-chain",
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

export const terraTestnet: SupportedChain = {
  isTest: true,
  id: "pisco-1",
  coingeckoPlatformId: "terra",
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

export const bitcoin: UnsupportedChain = {
  isTest: IS_TEST,
  id: `btc-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Bitcoin",
  blockExplorer: "https://btcscan.org",
  coingeckoPlatformId: null,
};

export const solana: UnsupportedChain = {
  isTest: IS_TEST,
  id: `sol-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: "Solana",
  blockExplorer: "https://solscan.io",
};

export const ripple: UnsupportedChain = {
  isTest: IS_TEST,
  id: `xrp-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Ripple",
  coingeckoPlatformId: null,
  blockExplorer: "https://xrpscan.com",
};

export const doge: UnsupportedChain = {
  isTest: IS_TEST,
  id: `doge-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: "Doge",
  blockExplorer: "https://dogechain.info",
};

const supportedChainList: SupportedChain[] = [
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

const unsupportedChainList: UnsupportedChain[] = [
  bitcoin,
  doge,
  solana,
  ripple,
];

export const chainList = [...supportedChainList, ...unsupportedChainList];

export const unsupportedChains = unsupportedChainList.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {} as UnsupportedChains
);
export const chains = chainList.reduce(
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
