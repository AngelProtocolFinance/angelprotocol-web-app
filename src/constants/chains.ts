import type {
  Chains,
  CosmosChainID,
  EVMChainID,
  SupportedChain,
  UnsupportedChain,
  UnsupportedChains,
} from "types/chain";
import { PROCESSING_RATES } from "./common";
import { IS_TEST } from "./env";

//mainnets
export const polygon: SupportedChain = {
  isTest: false,
  id: "137",
  coingeckoPlatformId: "polygon-pos",
  name: "Polygon",
  blockExplorer: "https://polygonscan.com",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.evm,
};

export const ethereum: SupportedChain = {
  isTest: false,
  id: "1",
  coingeckoPlatformId: "ethereum",
  name: "Ethereum",
  blockExplorer: "https://etherscan.io",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
  processingRate: PROCESSING_RATES.crypto.ethereum,
};

export const arbitrum: SupportedChain = {
  isTest: false,
  id: "42161",
  coingeckoPlatformId: "arbitrum-one",
  name: "Arbitrum One",
  blockExplorer: "https://arbiscan.io",
  logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.evm,
};

export const optimism: SupportedChain = {
  isTest: false,
  id: "10",
  coingeckoPlatformId: "optimistic-ethereum",
  name: "Optimism",
  blockExplorer: "https://optimistic.etherscan.io",
  logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.evm,
};

export const base: SupportedChain = {
  isTest: false,
  id: "8453",
  coingeckoPlatformId: "base",
  name: "Base",
  blockExplorer: "https://mainnet.basescan.org",
  logo: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto.evm,
};

export const binance: SupportedChain = {
  isTest: false,
  id: "56",
  coingeckoPlatformId: "binance-smart-chain",
  name: "Binance",
  blockExplorer: "https://bscscan.com",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.evm,
};

export const juno: SupportedChain = {
  isTest: false,
  id: "juno-1",
  coingeckoPlatformId: "juno",
  name: "Juno",
  blockExplorer: "https://www.mintscan.io/juno",
  logo: "https://avatars.githubusercontent.com/u/79813271?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto.cosmos,
};

export const stargaze: SupportedChain = {
  isTest: false,
  id: "stargaze-1",
  coingeckoPlatformId: "stargaze",
  name: "Stargaze",
  blockExplorer: "https://www.mintscan.io/stargaze",
  logo: "https://app.osmosis.zone/tokens/generated/stars.svg",
  processingRate: PROCESSING_RATES.crypto.cosmos,
};

export const kujira: SupportedChain = {
  isTest: false,
  id: "kaiyo-1",
  coingeckoPlatformId: "kujira",
  name: "Kujira",
  blockExplorer: "https://finder.kujira.network/kaiyo-1",
  logo: "https://avatars.githubusercontent.com/u/84391088?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto.cosmos,
};

export const osmosis: SupportedChain = {
  isTest: false,
  id: "osmosis-1",
  coingeckoPlatformId: "osmosis",
  name: "Osmosis",
  blockExplorer: "https://www.mintscan.io/osmosis",
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
  processingRate: PROCESSING_RATES.crypto.cosmos,
};

export const terraMainnet: SupportedChain = {
  isTest: false,
  id: "phoenix-1",
  coingeckoPlatformId: "terra",
  name: "Terra",
  blockExplorer: "https://finder.terra.money/mainnet",
  logo: "https://avatars.githubusercontent.com/u/38208150?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto.cosmos,
};

//testnets
export const polygonAmoy: SupportedChain = {
  isTest: true,
  id: "80002",
  coingeckoPlatformId: polygon.coingeckoPlatformId,
  name: "Polygon Amoy Testnet",
  blockExplorer: "https://amoy.polygonscan.com",
  logo: polygon.logo,
  processingRate: polygon.processingRate,
};

export const sepolia: SupportedChain = {
  isTest: true,
  id: "11155111",
  coingeckoPlatformId: ethereum.coingeckoPlatformId,
  name: "Ethereum Sepolia",
  blockExplorer: "https://sepolia.etherscan.io",
  logo: ethereum.logo,
  processingRate: ethereum.processingRate,
};

export const arbitrumSepolia: SupportedChain = {
  isTest: true,
  id: "421614",
  coingeckoPlatformId: arbitrum.coingeckoPlatformId,
  name: "Arbitrum Sepolia",
  blockExplorer: "https://sepolia.arbiscan.io",
  logo: arbitrum.logo,
  processingRate: arbitrum.processingRate,
};

export const optimismSepolia: SupportedChain = {
  isTest: true,
  id: "11155420",
  coingeckoPlatformId: optimism.coingeckoPlatformId,
  name: "Optimism Sepolia",
  blockExplorer: "https://sepolia-optimistic.etherscan.io",
  logo: optimism.logo,
  processingRate: optimism.processingRate,
};

export const baseSepolia: SupportedChain = {
  isTest: true,
  id: "84532",
  coingeckoPlatformId: base.coingeckoPlatformId,
  name: "Base Sepolia",
  blockExplorer: "https://sepolia.basescan.org",
  logo: base.logo,
  processingRate: base.processingRate,
};

export const binanceTestnet: SupportedChain = {
  isTest: true,
  id: "97",
  coingeckoPlatformId: binance.coingeckoPlatformId,
  name: "Binance Testnet",
  blockExplorer: "https://testnet.bscscan.com",
  logo: binance.logo,
  processingRate: binance.processingRate,
};

export const terraTestnet: SupportedChain = {
  isTest: true,
  id: "pisco-1",
  coingeckoPlatformId: terraMainnet.coingeckoPlatformId,
  name: "Terra Pisco",
  blockExplorer: "https://finder.terra.money/testnet",
  logo: terraMainnet.logo,
  processingRate: terraMainnet.processingRate,
};

export const stargazeTestnet: SupportedChain = {
  isTest: true,
  id: "elgafar-1",
  coingeckoPlatformId: stargaze.coingeckoPlatformId,
  name: "Stargaze Testnet",
  blockExplorer: "https://www.mintscan.io/stargaze",
  logo: stargaze.logo,
  processingRate: stargaze.processingRate,
};

export const kujiraTestnet: SupportedChain = {
  isTest: true,
  id: "harpoon-4",
  coingeckoPlatformId: kujira.coingeckoPlatformId,
  name: "Kujira Testnet",
  blockExplorer: "https://finder.kujira.network/harpoon-4",
  logo: kujira.logo,
  processingRate: kujira.processingRate,
};

export const osmosisTestnet: SupportedChain = {
  isTest: true,
  id: "osmo-test-5",
  coingeckoPlatformId: "osmosis",
  name: "Osmosis Testnet",
  blockExplorer: "https://www.mintscan.io/osmosis",
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
  processingRate: osmosis.processingRate,
};

export const bitcoin: UnsupportedChain = {
  isTest: IS_TEST,
  id: `btc-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `Bitcoin${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://btcscan.org",
  coingeckoPlatformId: null,
  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.others,
};

export const solana: UnsupportedChain = {
  isTest: IS_TEST,
  id: `sol-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: `Solana${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://solscan.io",
  logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.others,
};

export const ripple: UnsupportedChain = {
  isTest: IS_TEST,
  id: `xrp-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `XRP Ledger${IS_TEST ? " Testnet" : ""}`,
  coingeckoPlatformId: null,
  blockExplorer: "https://xrpscan.com",
  logo: "https://avatars.githubusercontent.com/u/3165523?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto.others,
};

export const doge: UnsupportedChain = {
  isTest: IS_TEST,
  id: `doge-${IS_TEST ? "testnet" : "mainnet"}`,
  coingeckoPlatformId: null,
  name: `Doge${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://dogechain.info",
  logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto.others,
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
