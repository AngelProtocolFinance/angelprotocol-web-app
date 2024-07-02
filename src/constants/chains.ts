import type {
  Chains,
  CosmosChainID,
  EVMChainID,
  SupportedChain,
  UnsupportedChain,
  UnsupportedChains,
} from "types/chain";
import { IS_TEST } from "./env";
import { APIs } from "./urls";

const baseProxyURL = APIs.nodeProxy;

//mainnets
export const polygon: SupportedChain = {
  isTest: false,
  id: "137",
  coingeckoPlatformId: "polygon-pos",
  brand: "polygon",
  name: "Polygon",
  nodeUrl: baseProxyURL + "/polygon",
  blockExplorer: "https://polygonscan.com",
  nativeToken: {
    id: "137",
    symbol: "MATIC",
    decimals: 18,
    coinGeckoId: "matic-network",
  },
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032",
};

export const ethereum: SupportedChain = {
  isTest: false,
  id: "1",
  coingeckoPlatformId: "ethereum",
  brand: "ethereum",
  name: "Ethereum",
  nodeUrl: baseProxyURL + "/ethereum",
  blockExplorer: "https://etherscan.io",
  nativeToken: {
    id: "1",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
};

export const arbitrum: SupportedChain = {
  isTest: false,
  id: "42161",
  coingeckoPlatformId: "arbitrum-one",
  brand: "arbitrum",
  name: "Arbitrum One",
  nodeUrl: baseProxyURL + "/arbitrum",
  blockExplorer: "https://arbiscan.io",
  nativeToken: {
    id: "42161",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032",
};

export const optimism: SupportedChain = {
  isTest: false,
  id: "10",
  coingeckoPlatformId: "optimistic-ethereum",
  brand: "optimism",
  name: "Optimism",
  nodeUrl: baseProxyURL + "/optimism",
  blockExplorer: "https://optimistic.etherscan.io",
  nativeToken: {
    id: "10",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032",
};

export const base: SupportedChain = {
  isTest: false,
  id: "8453",
  coingeckoPlatformId: "base",
  brand: "base",
  name: "Base",
  nodeUrl: baseProxyURL + "/base",
  blockExplorer: "https://mainnet.basescan.org",
  nativeToken: {
    id: "8453",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
};

export const binance: SupportedChain = {
  isTest: false,
  id: "56",
  coingeckoPlatformId: "binance-smart-chain",
  brand: "binance",
  name: "Binance",
  nodeUrl: baseProxyURL + "/bsc",
  blockExplorer: "https://bscscan.com",
  nativeToken: {
    id: "56",
    symbol: "BNB",
    decimals: 18,
    coinGeckoId: "binancecoin",
  },
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032",
};

export const juno: SupportedChain = {
  isTest: false,
  id: "juno-1",
  coingeckoPlatformId: "juno",
  brand: "juno",
  name: "Juno",
  nodeUrl: baseProxyURL + "/juno",
  blockExplorer: "https://www.mintscan.io/juno",
  nativeToken: {
    id: "ujuno",
    symbol: "JUNO",
    decimals: 6,
    coinGeckoId: "juno-network",
  },
  logo: "https://avatars.githubusercontent.com/u/79813271?s=200&v=4",
};

export const stargaze: SupportedChain = {
  isTest: false,
  id: "stargaze-1",
  coingeckoPlatformId: "stargaze",
  brand: "stargaze",
  name: "Stargaze",
  nodeUrl: baseProxyURL + "/stargaze",
  blockExplorer: "https://www.mintscan.io/stargaze",
  nativeToken: {
    id: "ustars",
    symbol: "STARS",
    decimals: 6,
    coinGeckoId: "stargaze",
  },
  logo: "https://app.osmosis.zone/tokens/generated/stars.svg",
};

export const kujira: SupportedChain = {
  isTest: false,
  id: "kaiyo-1",
  coingeckoPlatformId: "kujira",
  brand: "kujira",
  name: "Kujira",
  nodeUrl: baseProxyURL + "/kujira",
  blockExplorer: "https://finder.kujira.network/kaiyo-1",
  nativeToken: {
    id: "ukuji",
    symbol: "KUJI",
    decimals: 6,
    coinGeckoId: "kujira",
  },
  logo: "https://avatars.githubusercontent.com/u/84391088?s=200&v=4",
};

export const osmosis: SupportedChain = {
  isTest: false,
  id: "osmosis-1",
  coingeckoPlatformId: "osmosis",
  brand: "osmosis",
  name: "Osmosis",
  nodeUrl: baseProxyURL + "/osmosis",
  blockExplorer: "https://www.mintscan.io/osmosis",
  nativeToken: {
    id: "uosmo",
    symbol: "OSMO",
    decimals: 6,
    coinGeckoId: "osmosis",
  },
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
};

export const terraMainnet: SupportedChain = {
  isTest: false,
  id: "phoenix-1",
  coingeckoPlatformId: "terra",
  brand: "terra",
  name: "Terra",
  nodeUrl: baseProxyURL + "/terra/lcd/main",
  blockExplorer: "https://finder.terra.money/mainnet",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
    coinGeckoId: "terra-luna-2",
  },
  logo: "https://avatars.githubusercontent.com/u/38208150?s=200&v=4",
};

//testnets
export const polygonAmoy: SupportedChain = {
  isTest: true,
  id: "80002",
  brand: "polygonAmoy",
  coingeckoPlatformId: polygon.coingeckoPlatformId,
  name: "Polygon Amoy Testnet",
  nodeUrl: baseProxyURL + "/polygonAmoy",
  blockExplorer: "https://amoy.polygonscan.com",
  nativeToken: {
    id: "80002",
    symbol: "MATIC",
    decimals: 18,
    coinGeckoId: "matic-network",
  },
  logo: polygon.logo,
};

export const sepolia: SupportedChain = {
  isTest: true,
  id: "11155111",
  coingeckoPlatformId: ethereum.coingeckoPlatformId,
  brand: "sepolia",
  name: "Ethereum Sepolia",
  nodeUrl: baseProxyURL + "/sepolia",
  blockExplorer: "https://sepolia.etherscan.io",
  nativeToken: {
    id: "11155111",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: ethereum.logo,
};

export const arbitrumSepolia: SupportedChain = {
  isTest: true,
  id: "421614",
  coingeckoPlatformId: arbitrum.coingeckoPlatformId,
  brand: "arbitrum",
  name: "Arbitrum Sepolia",
  nodeUrl: baseProxyURL + "/arbitrum-test",
  blockExplorer: "https://sepolia.arbiscan.io",
  nativeToken: {
    id: "421614",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: arbitrum.logo,
};

export const optimismSepolia: SupportedChain = {
  isTest: true,
  id: "11155420",
  coingeckoPlatformId: optimism.coingeckoPlatformId,
  brand: "optimism",
  name: "Optimism Sepolia",
  nodeUrl: baseProxyURL + "/optimism-test",
  blockExplorer: "https://sepolia-optimistic.etherscan.io",
  nativeToken: {
    id: "11155420",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: optimism.logo,
};

export const baseSepolia: SupportedChain = {
  isTest: true,
  id: "84532",
  coingeckoPlatformId: base.coingeckoPlatformId,
  brand: "base",
  name: "Base Sepolia",
  nodeUrl: baseProxyURL + "/base-test",
  blockExplorer: "https://sepolia.basescan.org",
  nativeToken: {
    id: "84532",
    symbol: "ETH",
    decimals: 18,
    coinGeckoId: "ethereum",
  },
  logo: base.logo,
};

export const binanceTestnet: SupportedChain = {
  isTest: true,
  id: "97",
  coingeckoPlatformId: binance.coingeckoPlatformId,
  brand: "binance",
  name: "Binance Testnet",
  nodeUrl: baseProxyURL + "/bsc-test",
  blockExplorer: "https://testnet.bscscan.com",
  nativeToken: {
    id: "97",
    symbol: "BNB",
    decimals: 18,
    coinGeckoId: "binancecoin",
  },
  logo: binance.logo,
};

export const terraTestnet: SupportedChain = {
  isTest: true,
  id: "pisco-1",
  coingeckoPlatformId: terraMainnet.coingeckoPlatformId,
  brand: "terra",
  name: "Terra Pisco",
  nodeUrl: baseProxyURL + "/terra/lcd/test",
  blockExplorer: "https://finder.terra.money/testnet",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
    coinGeckoId: "terra-luna-2",
  },
  logo: terraMainnet.logo,
};

export const stargazeTestnet: SupportedChain = {
  isTest: true,
  id: "elgafar-1",
  brand: "stargaze",
  coingeckoPlatformId: stargaze.coingeckoPlatformId,
  name: "Stargaze Testnet",
  nodeUrl: baseProxyURL + "/stargaze-test",
  blockExplorer: "https://www.mintscan.io/stargaze",
  nativeToken: {
    id: "ustars",
    symbol: "STARS",
    decimals: 6,
    coinGeckoId: "stargaze",
  },
  logo: stargaze.logo,
};

export const kujiraTestnet: SupportedChain = {
  isTest: true,
  id: "harpoon-4",
  coingeckoPlatformId: kujira.coingeckoPlatformId,
  brand: "kujira",
  name: "Kujira Testnet",
  nodeUrl: baseProxyURL + "/kujira-test",
  blockExplorer: "https://finder.kujira.network/harpoon-4",
  nativeToken: {
    id: "ukuji",
    symbol: "KUJI",
    decimals: 6,
    coinGeckoId: "kujira",
  },
  logo: kujira.logo,
};

export const osmosisTestnet: SupportedChain = {
  isTest: true,
  id: "osmo-test-5",
  coingeckoPlatformId: "osmosis",
  brand: "osmosis",
  name: "Osmosis Testnet",
  nodeUrl: baseProxyURL + "/osmosis-test",
  blockExplorer: "https://www.mintscan.io/osmosis",
  nativeToken: {
    id: "uosmo",
    symbol: "OSMO",
    decimals: 6,
    coinGeckoId: "osmosis",
  },
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
};

export const bitcoin: UnsupportedChain = {
  isTest: IS_TEST,
  id: `btc-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `Bitcoin${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://btcscan.org",
  coingeckoPlatformId: null,
  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032",
};

export const solana: UnsupportedChain = {
  isTest: IS_TEST,
  id: `sol-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: `Solana${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://solscan.io",
  logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=032",
};

export const ripple: UnsupportedChain = {
  isTest: IS_TEST,
  id: `xrp-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `XRP Ledger${IS_TEST ? " Testnet" : ""}`,
  coingeckoPlatformId: null,
  blockExplorer: "https://xrpscan.com",
  logo: "https://avatars.githubusercontent.com/u/3165523?s=200&v=4",
};

export const doge: UnsupportedChain = {
  isTest: IS_TEST,
  id: `doge-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: `Doge${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://dogechain.info",
  logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=032",
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
  osmosis,
  stargaze,
  terraMainnet,
  sepolia,
  polygonAmoy,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  binanceTestnet,
  terraTestnet,
  osmosisTestnet,
  kujiraTestnet,
  stargazeTestnet,
];

const unsupportedChainList: UnsupportedChain[] = [
  bitcoin,
  doge,
  solana,
  ripple,
];

export const chainList = [...supportedChainList, ...unsupportedChainList].sort(
  (a, b) => a.name.localeCompare(b.name)
);

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
  "elgafar-1",
  "kaiyo-1",
  "harpoon-4",
  "osmosis-1",
  "osmo-test-5",
];
