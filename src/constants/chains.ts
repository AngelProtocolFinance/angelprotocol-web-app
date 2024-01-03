import { Chain, Chains, CosmosChainID, EVMChainID } from "types/chain";

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
export const mumbai: Chain = {
  isTest: true,
  id: "80001",
  brand: "polygon",
  name: "Polygon Mumbai Testnet",
  rpc: baseProxyURL + "/mumbai",
  lcd: "",
  blockExplorer: "https://mumbai.polygonscan.com",
  nativeToken: {
    id: "80001",
    symbol: "MATIC",
    decimals: 18,
    coinGeckoId: "matic-network",
  },
};

export const goerli: Chain = {
  isTest: true,
  id: "5",
  brand: "ethereum",
  name: "Ethereum Goerli Testnet",
  rpc: baseProxyURL + "/goerli",
  lcd: "",
  blockExplorer: "https://goerli.etherscan.io",
  nativeToken: {
    id: "5",
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
  name: "Terra Pisco testnet",
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

export const chainList: Chain[] = [
  polygon,
  ethereum,
  binance,
  juno,
  terraMainnet,
  mumbai,
  goerli,
  binanceTestnet,
  terraTestnet,
];

export const chains: Chains = chainList.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {} as Chains
);

export const EVMChains: EVMChainID[] = ["1", "137", "5", "56", "80001", "97"];
export const cosmosChains: CosmosChainID[] = ["juno-1", "uni-6"];
