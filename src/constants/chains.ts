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

export const optimism: SupportedChain = {
  isTest: false,
  id: "10",
  brand: "optimism",
  name: "Optimism",
  rpc: "https://mainnet.optimism.io",
  lcd: "",
  blockExplorer: "https://optimistic.etherscan.io",
  nativeToken: {
    id: "10",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const base: SupportedChain = {
  isTest: false,
  id: "8453",
  brand: "base",
  name: "Base",
  rpc: "https://mainnet.base.org",
  lcd: "",
  blockExplorer: "https://mainnet.basescan.org",
  nativeToken: {
    id: "8453",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const binance: SupportedChain = {
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

export const juno: SupportedChain = {
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

export const stargaze: SupportedChain = {
  isTest: false,
  id: "stargaze-1",
  brand: "stargaze",
  name: "Stargaze",
  lcd: "https://stargaze-rest.publicnode.com",
  rpc: "https://stargaze-rpc.publicnode.com:443",
  blockExplorer: "https://www.mintscan.io/stargaze",
  nativeToken: {
    id: "ustars",
    symbol: "STARS",
    decimals: 6,
    coinGeckoId: "stargaze",
  },
};

export const kujira: SupportedChain = {
  isTest: false,
  id: "kaiyo-1",
  brand: "kujira",
  name: "Kujira",
  lcd: "https://kujira-rpc.publicnode.com",
  rpc: "https://kujira-rpc.publicnode.com:443",
  blockExplorer: "https://finder.kujira.network/kaiyo-1",
  nativeToken: {
    id: "ukuji",
    symbol: "KUJI",
    decimals: 6,
    coinGeckoId: "kujira",
  },
};

export const terraMainnet: SupportedChain = {
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
export const polygonAmoy: SupportedChain = {
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

export const sepolia: SupportedChain = {
  isTest: true,
  id: "11155111",
  brand: "sepolia",
  name: "Ethereum Sepolia",
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

export const optimismSepolia: SupportedChain = {
  isTest: true,
  id: "11155420",
  brand: "optimism",
  name: "Optimism Sepolia",
  rpc: "https://sepolia.optimism.io",
  lcd: "",
  blockExplorer: "https://sepolia-optimistic.etherscan.io",
  nativeToken: {
    id: "11155420",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const baseSepolia: SupportedChain = {
  isTest: true,
  id: "84532",
  brand: "base",
  name: "Base Sepolia",
  rpc: "https://sepolia.base.org",
  lcd: "",
  blockExplorer: "https://sepolia.basescan.org",
  nativeToken: {
    id: "84532",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
};

export const binanceTestnet: SupportedChain = {
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

export const terraTestnet: SupportedChain = {
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

export const bitcoin: UnsupportedChain = {
  isTest: IS_TEST,
  id: `btc-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Bitcoin",
  blockExplorer: "https://btcscan.org",
};

export const solana: UnsupportedChain = {
  isTest: IS_TEST,
  id: `sol-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Solana",
  blockExplorer: "https://solscan.io",
};

export const ripple: UnsupportedChain = {
  isTest: IS_TEST,
  id: `xrp-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Ripple",
  blockExplorer: "https://xrpscan.com",
};

export const doge: UnsupportedChain = {
  isTest: IS_TEST,
  id: `doge-${IS_TEST ? "testnet" : "mainnet"}`,
  name: "Doge",
  blockExplorer: "https://dogechain.info",
};

const supportedChainList: SupportedChain[] = [
  polygon,
  ethereum,
  arbitrum,
  optimism,
  base,
  binance,
  juno,
  kujira,
  stargaze,
  terraMainnet,
  sepolia,
  polygonAmoy,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
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
  "10",
  "11155420",
  "8453",
  "84532",
];
export const cosmosChains: CosmosChainID[] = [
  "juno-1",
  "uni-6",
  "stargaze-1",
  "kaiyo-1",
];
