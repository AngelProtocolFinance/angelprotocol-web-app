import { ConnectedToChainType } from "contexts/WalletContext";
import { IS_TEST, JUNO_LCD_OVERRIDE, JUNO_RPC_OVERRIDE } from "./env";

export type Chain = {
  type: ConnectedToChainType["type"]; //to determine which type tx to perform
  name: string;
  rpc: string;
  lcd: string;
  txExplorer: string;
};

type ChainRegistry = { [key: string]: Chain };

const infuraId = process.env.REACT_APP_INFURA_ID;

const testnets = {
  "uni-6": {
    type: "cosmos",
    brand: "juno",
    name: "Juno Testnet",
    lcd:
      JUNO_LCD_OVERRIDE ||
      "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/juno/uni-6/lcd",
    rpc:
      JUNO_RPC_OVERRIDE ||
      "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/juno/uni-6/rpc",
    txExplorer: "https://testnet.ping.pub/juno/tx/",
  },
  "pisco-1": {
    type: "terra",
    brand: "terra",
    name: "Terra Pisco testnet",
    lcd: "https://pisco-lcd.terra.dev",
    rpc: "",
    txExplorer: "https://finder.terra.money/testnet/tx/",
  },
  5: {
    type: "evm",
    brand: "ethereum",
    name: "Ethereum Goerli Testnet",
    rpc: `https://goerli.infura.io/v3/${infuraId}`,
    lcd: "",
    txExplorer: "https://goerli.etherscan.io/tx/",
  },
  97: {
    type: "evm",
    brand: "binance",
    name: "Binance Testnet",
    rpc: "https://rpc.ankr.com/bsc_testnet_chapel",
    lcd: "",
    txExplorer: "https://testnet.bscscan.com/tx/",
  },
  80001: {
    type: "evm",
    brand: "polygon",
    name: "Polygon Mumbai Testnet",
    rpc: "https://rpc-mumbai.maticvigil.com",
    lcd: "",
    txExplorer: "https://mumbai.polygonscan.com/tx/",
  },
} as const;

const mainnets = {
  "juno-1": {
    type: "cosmos",
    brand: "juno",
    name: "Juno Mainnet",
    lcd: "https://juno-api.polkachu.com",
    rpc: "https://juno-rpc.polkachu.com",
    txExplorer: "https://finder.terra.money/testnet/tx/",
  },
  "phoenix-1": {
    type: "terra",
    brand: "terra",
    name: "Terra Mainnet",
    lcd: "https://phoenix-lcd.terra.dev",
    rpc: "",
    txExplorer: "https://finder.terra.money/mainnet/tx/",
  },
  1: {
    type: "evm",
    brand: "ethereum",
    name: "Ethereum Mainnet",
    rpc: `https://mainnet.infura.io/v3/${infuraId}`,
    lcd: "",
    txExplorer: "https://etherscan.io/tx/",
  },

  56: {
    type: "evm",
    brand: "binance",
    name: "Binance Mainnet",
    rpc: "https://rpc.ankr.com/bsc",
    lcd: "",
    txExplorer: "https://bscscan.com/tx/",
  },
  137: {
    type: "evm",
    brand: "polygon",
    name: "Polygon Mainnet",
    rpc: "https://rpc-mainnet.maticvigil.com",
    lcd: "",
    txExplorer: "https://polygonscan.com/tx/",
  },
} as const;

/** for run-time access */
export const chains: ChainRegistry = IS_TEST ? testnets : mainnets;

/** for static access  */
export const _chains = { ...testnets, ...mainnets };

export type StaticRegistry = typeof _chains;
export type ChainIDs = keyof StaticRegistry;
function toChainIDRegistry<T extends keyof StaticRegistry>(
  registry: StaticRegistry
): { [key in StaticRegistry[T]["brand"]]: string } {
  return Object.entries(registry).reduce(
    (result, [chainId, chain]) => ({ ...result, [chain.brand]: chainId }),
    {} as any
  );
}

/** chainID by brand */
export const chainIds = toChainIDRegistry(chains as StaticRegistry);
