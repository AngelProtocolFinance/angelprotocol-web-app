import { INFURA_ID } from "./env";

type ChainID = string; //"137", "1"
type NativeAtomicUnit = string; //ujunox uluna
export type Chain = {
  id: ChainID;
  type: "evm" | "cosmos" | "terra";
  brand: string; //
  name: string;
  rpc: string;
  lcd: string;
  txExplorer: string;
  nativeToken: {
    id: ChainID | NativeAtomicUnit;
    symbol: string;
    decimals: number;
  };
};

type Chains = Record<ChainID, Chain>;

const polygon: Chain = {
  id: "137",
  type: "evm",
  brand: "polygon",
  name: "Polygon",
  rpc: "https://rpc-mainnet.maticvigil.com",
  lcd: "",
  txExplorer: "https://polygonscan.com/tx",
  nativeToken: {
    id: "137",
    symbol: "MATIC",
    decimals: 18,
  },
};

const ethereum: Chain = {
  id: "1",
  type: "evm",
  brand: "ethereum",
  name: "Ethereum",
  rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  lcd: "",
  txExplorer: "https://etherscan.io/tx",
  nativeToken: {
    id: "1",
    symbol: "ETH",
    decimals: 18,
  },
};

const binance: Chain = {
  id: "56",
  type: "evm",
  brand: "binance",
  name: "Binance",
  rpc: "https://rpc.ankr.com/bsc",
  lcd: "",
  txExplorer: "https://bscscan.com/tx",
  nativeToken: {
    id: "56",
    symbol: "BNB",
    decimals: 18,
  },
};

const juno: Chain = {
  id: "juno-1",
  type: "cosmos",
  brand: "juno",
  name: "Juno",
  lcd: "https://juno-api.polkachu.com",
  rpc: "https://juno-rpc.polkachu.com",
  txExplorer: "https://www.mintscan.io/juno/tx",
  nativeToken: {
    id: "ujuno",
    symbol: "JUNO",
    decimals: 6,
  },
};

const terraMainnet: Chain = {
  id: "phoenix-1",
  type: "terra",
  brand: "terra",
  name: "Terra Mainnet",
  lcd: "https://phoenix-lcd.terra.dev",
  rpc: "",
  txExplorer: "https://finder.terra.money/mainnet/tx",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
  },
};

const mumbai: Chain = {
  id: "80001",
  type: "evm",
  brand: "polygon",
  name: "Polygon Mumbai Testnet",
  rpc: "https://rpc-mumbai.maticvigil.com",
  lcd: "",
  txExplorer: "https://mumbai.polygonscan.com/tx",
  nativeToken: {
    id: "80001",
    symbol: "MATIC",
    decimals: 18,
  },
};

const goerli: Chain = {
  id: "5",
  type: "evm",
  brand: "ethereum",
  name: "Ethereum Goerli Testnet",
  rpc: `https://goerli.infura.io/v3/${INFURA_ID}`,
  lcd: "",
  txExplorer: "https://goerli.etherscan.io/tx",
  nativeToken: {
    id: "5",
    symbol: "ETH",
    decimals: 18,
  },
};

const binanceTestnet: Chain = {
  id: "97",
  type: "evm",
  brand: "binance",
  name: "Binance Testnet",
  rpc: "https://rpc.ankr.com/bsc_testnet_chapel/tx",
  lcd: "",
  txExplorer: "https://testnet.bscscan.com/tx",
  nativeToken: {
    id: "97",
    symbol: "BNB",
    decimals: 18,
  },
};

const junoTestnet: Chain = {
  id: "uni-6",
  type: "cosmos",
  brand: "juno",
  name: "Juno Testnet",
  lcd: "https://api.uni.junonetwork.io",
  rpc: "https://rpc.uni.junonetwork.io",
  txExplorer: "https://testnet.ping.pub/juno/tx",
  nativeToken: {
    id: "ujunox",
    symbol: "JUNOX",
    decimals: 6,
  },
};

const terraTestnet: Chain = {
  id: "pisco-1",
  type: "terra",
  brand: "terra",
  name: "Terra Pisco testnet",
  lcd: "https://pisco-lcd.terra.dev",
  rpc: "",
  txExplorer: "https://finder.terra.money/testnet/tx",
  nativeToken: {
    id: "uluna",
    symbol: "LUNA",
    decimals: 6,
  },
};

export const chains: Chains = {
  [polygon.id]: polygon,
  [mumbai.id]: mumbai,
  [ethereum.id]: ethereum,
  [goerli.id]: goerli,
  [binance.id]: binance,
  [binanceTestnet.id]: binanceTestnet,
  [juno.id]: juno,
  [junoTestnet.id]: junoTestnet,
  [terraMainnet.id]: terraMainnet,
  [terraTestnet.id]: terraTestnet,
};
