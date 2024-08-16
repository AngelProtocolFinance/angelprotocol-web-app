import type { Chain, Chains, Tier2Chains } from "types/chain";
import { PROCESSING_RATES } from "./common";
import { IS_TEST } from "./env";

//mainnets
export const polygon: Chain.Tier1 = {
  isTest: false,
  id: "137",
  name: "Polygon",
  blockExplorer: "https://polygonscan.com",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const ethereum: Chain.Tier1 = {
  isTest: false,
  id: "1",
  name: "Ethereum",
  blockExplorer: "https://etherscan.io",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const arbitrum: Chain.Tier1 = {
  isTest: false,
  id: "42161",
  name: "Arbitrum One",
  blockExplorer: "https://arbiscan.io",
  logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const optimism: Chain.Tier1 = {
  isTest: false,
  id: "10",
  name: "Optimism",
  blockExplorer: "https://optimistic.etherscan.io",
  logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const base: Chain.Tier1 = {
  isTest: false,
  id: "8453",
  name: "Base",
  blockExplorer: "https://mainnet.basescan.org",
  logo: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto,
};

export const binance: Chain.Tier1 = {
  isTest: false,
  id: "56",
  name: "Binance",
  blockExplorer: "https://bscscan.com",
  logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const juno: Chain.Tier1 = {
  isTest: false,
  id: "juno-1",
  name: "Juno",
  blockExplorer: "https://www.mintscan.io/juno",
  logo: "https://avatars.githubusercontent.com/u/79813271?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto,
};

export const stargaze: Chain.Tier1 = {
  isTest: false,
  id: "stargaze-1",
  name: "Stargaze",
  blockExplorer: "https://www.mintscan.io/stargaze",
  logo: "https://app.osmosis.zone/tokens/generated/stars.svg",
  processingRate: PROCESSING_RATES.crypto,
};

export const kujira: Chain.Tier1 = {
  isTest: false,
  id: "kaiyo-1",
  name: "Kujira",
  blockExplorer: "https://finder.kujira.network/kaiyo-1",
  logo: "https://avatars.githubusercontent.com/u/84391088?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto,
};

export const osmosis: Chain.Tier1 = {
  isTest: false,
  id: "osmosis-1",
  name: "Osmosis",
  blockExplorer: "https://www.mintscan.io/osmosis",
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const terraMainnet: Chain.Tier1 = {
  isTest: false,
  id: "phoenix-1",
  name: "Terra",
  blockExplorer: "https://finder.terra.money/mainnet",
  logo: "https://avatars.githubusercontent.com/u/38208150?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto,
};

//testnets
export const polygonAmoy: Chain.Tier1 = {
  isTest: true,
  id: "80002",
  name: "Polygon Amoy Testnet",
  blockExplorer: "https://amoy.polygonscan.com",
  logo: polygon.logo,
  processingRate: polygon.processingRate,
};

export const sepolia: Chain.Tier1 = {
  isTest: true,
  id: "11155111",
  name: "Ethereum Sepolia",
  blockExplorer: "https://sepolia.etherscan.io",
  logo: ethereum.logo,
  processingRate: ethereum.processingRate,
};

export const arbitrumSepolia: Chain.Tier1 = {
  isTest: true,
  id: "421614",
  name: "Arbitrum Sepolia",
  blockExplorer: "https://sepolia.arbiscan.io",
  logo: arbitrum.logo,
  processingRate: arbitrum.processingRate,
};

export const optimismSepolia: Chain.Tier1 = {
  isTest: true,
  id: "11155420",
  name: "Optimism Sepolia",
  blockExplorer: "https://sepolia-optimistic.etherscan.io",
  logo: optimism.logo,
  processingRate: optimism.processingRate,
};

export const baseSepolia: Chain.Tier1 = {
  isTest: true,
  id: "84532",
  name: "Base Sepolia",
  blockExplorer: "https://sepolia.basescan.org",
  logo: base.logo,
  processingRate: base.processingRate,
};

export const binanceTestnet: Chain.Tier1 = {
  isTest: true,
  id: "97",
  name: "Binance Testnet",
  blockExplorer: "https://testnet.bscscan.com",
  logo: binance.logo,
  processingRate: binance.processingRate,
};

export const terraTestnet: Chain.Tier1 = {
  isTest: true,
  id: "pisco-1",
  name: "Terra Pisco",
  blockExplorer: "https://finder.terra.money/testnet",
  logo: terraMainnet.logo,
  processingRate: terraMainnet.processingRate,
};

export const stargazeTestnet: Chain.Tier1 = {
  isTest: true,
  id: "elgafar-1",
  name: "Stargaze Testnet",
  blockExplorer: "https://www.mintscan.io/stargaze",
  logo: stargaze.logo,
  processingRate: stargaze.processingRate,
};

export const kujiraTestnet: Chain.Tier1 = {
  isTest: true,
  id: "harpoon-4",
  name: "Kujira Testnet",
  blockExplorer: "https://finder.kujira.network/harpoon-4",
  logo: kujira.logo,
  processingRate: kujira.processingRate,
};

export const osmosisTestnet: Chain.Tier1 = {
  isTest: true,
  id: "osmo-test-5",
  name: "Osmosis Testnet",
  blockExplorer: "https://www.mintscan.io/osmosis",
  logo: "https://cryptologos.cc/logos/osmosis-osmo-logo.png?v=032",
  processingRate: osmosis.processingRate,
};

export const bitcoin: Chain.Tier2 = {
  isTest: IS_TEST,
  id: `btc-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `Bitcoin${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://btcscan.org",
  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const solana: Chain.Tier2 = {
  isTest: IS_TEST,
  id: `sol-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `Solana${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://solscan.io",
  logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

export const ripple: Chain.Tier2 = {
  isTest: IS_TEST,
  id: `xrp-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `XRP Ledger${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://xrpscan.com",
  logo: "https://avatars.githubusercontent.com/u/3165523?s=200&v=4",
  processingRate: PROCESSING_RATES.crypto,
};

export const doge: Chain.Tier2 = {
  isTest: IS_TEST,
  id: `doge-${IS_TEST ? "testnet" : "mainnet"}`,
  name: `Doge${IS_TEST ? " Testnet" : ""}`,
  blockExplorer: "https://dogechain.info",
  logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=032",
  processingRate: PROCESSING_RATES.crypto,
};

const tier1ChainList: Chain.Tier1[] = [
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

const tier2ChainList: Chain.Tier2[] = [bitcoin, doge, solana, ripple];

export const chainList = [...tier1ChainList, ...tier2ChainList].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export const tier2Chains = tier2ChainList.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {} as Tier2Chains
);
export const chains = chainList.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {} as Chains
);

export const EvmChainIds: Chain.Id.EVM[] = [
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
export const cosmosChainIds: Chain.Id.Cosmos[] = [
  "juno-1",
  "uni-6",
  "stargaze-1",
  "elgafar-1",
  "kaiyo-1",
  "harpoon-4",
  "osmosis-1",
  "osmo-test-5",
];
