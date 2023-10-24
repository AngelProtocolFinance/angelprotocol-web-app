import {
  Chain,
  Chains,
  CosmosChainID,
  EVMChainID,
  TerraChainID,
} from "types/chain";

export const polygon: Chain = {
  id: "137",
  brand: "polygon",
  name: "Polygon",
  rpc: "https://rpc-mainnet.maticvigil.com",
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
  id: "1",
  brand: "ethereum",
  name: "Ethereum",
  rpc: `https://mainnet.infura.io/v3/${"INFURA_ID"}`,
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
  id: "56",
  brand: "binance",
  name: "Binance",
  rpc: "https://rpc.ankr.com/bsc",
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
  id: "phoenix-1",
  brand: "terra",
  name: "Terra Mainnet",
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

export const mumbai: Chain = {
  id: "80001",
  brand: "polygon",
  name: "Polygon Mumbai Testnet",
  rpc: "https://rpc-mumbai.maticvigil.com",
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
  id: "5",
  brand: "ethereum",
  name: "Ethereum Goerli Testnet",
  rpc: `https://goerli.infura.io/v3/${"INFURA_ID"}`,
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
  id: "97",
  brand: "binance",
  name: "Binance Testnet",
  rpc: "https://rpc.ankr.com/bsc_testnet_chapel",
  lcd: "",
  blockExplorer: "https://testnet.bscscan.com",
  nativeToken: {
    id: "97",
    symbol: "BNB",
    decimals: 18,
    coinGeckoId: "binancecoin",
  },
};

export const junoTestnet: Chain = {
  id: "uni-6",
  brand: "juno",
  name: "Juno Testnet",
  lcd: "https://api.uni.junonetwork.io",
  rpc: "https://rpc.uni.junonetwork.io",
  blockExplorer: "https://testnet.ping.pub/juno",
  nativeToken: {
    id: "ujunox",
    symbol: "JUNOX",
    decimals: 6,
    coinGeckoId: "ethereum",
  },
};

export const terraTestnet: Chain = {
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

export const chains: Chains = {
  "137": polygon,
  "80001": mumbai,
  "1": ethereum,
  "5": goerli,
  "56": binance,
  "97": binanceTestnet,
  "juno-1": juno,
  "uni-6": junoTestnet,
  "pisco-1": terraMainnet,
  "phoenix-1": terraTestnet,
};

export const EVMChains: EVMChainID[] = ["1", "137", "5", "56", "80001", "97"];
export const cosmosChains: CosmosChainID[] = ["juno-1", "uni-6"];
export const terraChains: TerraChainID[] = ["phoenix-1", "pisco-1"];
