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
  "uni-5": {
    type: "cosmos",
    brand: "juno",
    name: "Juno Testnet",
    lcd: JUNO_LCD_OVERRIDE || "https://api.uni.junonetwork.io",
    rpc: JUNO_RPC_OVERRIDE || "https://rpc.uni.junonetwork.io",
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
export enum chainIDs {
  junoMain = "juno-1",
  junoTest = "uni-5",
  polygonMain = "137",
  polygonTest = "80001",
  binanceMain = "56",
  binanceTest = "97",
  ethMain = "1",
  ethTest = "5",
  terraMain = "phoenix-1",
  terraTest = "pisco-1",
  //add axelar, connext
}

/** 
type Info = { txExplorer: string; addressExplorer: string };

const explorers: { [key in chainIDs]: string } = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  97: "https://testnet.bscscan.com",
  56: "https://bscscan.com",
  137: "https://polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
  "juno-1": "https://www.mintscan.io/juno",
  "uni-5": "https://testnet.mintscan.io/juno-testnet",
  "phoenix-1": "https://finder.terra.money/mainnet",
  "pisco-1": "https://finder.terra.money/testnet",
};

const _chains: { [key in chainIDs]: Info } = {
  [chainIDs.ethMain]: {
    txExplorer: `${explorers[chainIDs.ethMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.ethMain]}/address`,
  },
  [chainIDs.ethTest]: {
    txExplorer: `${explorers[chainIDs.ethTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.ethTest]}/address`,
  },
  [chainIDs.binanceMain]: {
    txExplorer: `${explorers[chainIDs.binanceMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.binanceMain]}/address`,
  },
  [chainIDs.binanceTest]: {
    txExplorer: `${explorers[chainIDs.binanceTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.binanceTest]}/address`,
  },
  [chainIDs.polygonMain]: {
    txExplorer: `${explorers[chainIDs.polygonMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.polygonMain]}/address`,
  },
  [chainIDs.polygonTest]: {
    txExplorer: `${explorers[chainIDs.polygonTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.polygonTest]}/address`,
  },
  [chainIDs.junoMain]: {
    txExplorer: `${explorers[chainIDs.junoMain]}/txs`,
    addressExplorer: `${explorers[chainIDs.junoMain]}/account`,
  },
  [chainIDs.junoTest]: {
    txExplorer: `${explorers[chainIDs.junoTest]}/txs`,
    addressExplorer: `${explorers[chainIDs.junoTest]}/account`,
  },
  [chainIDs.terraMain]: {
    txExplorer: `${explorers[chainIDs.terraMain]}/tx`,
    addressExplorer: `${explorers[chainIDs.terraMain]}/address`,
  },
  [chainIDs.terraTest]: {
    txExplorer: `${explorers[chainIDs.terraTest]}/tx`,
    addressExplorer: `${explorers[chainIDs.terraTest]}/address`,
  },
};

export const chains: { [index: string]: Info } = new Proxy(_chains, {
  get(target, key: chainIDs) {
    return (
      target[key] ?? {
        txExplorer: "https://app.angelprotocol.io",
        addressExplorer: "https://app.angelprotocol.io",
      }
    ); //TODO: what's good fallback link
  },
});

*/
