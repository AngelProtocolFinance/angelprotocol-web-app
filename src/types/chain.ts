export type EVMChainID =
  //polygon
  | "137"
  | "80002"
  //ethereum
  | "1"
  | "11155111"
  // arbitrum
  | "42161"
  | "421614"
  //binance
  | "56"
  | "97";

export type CosmosChainID = "juno-1" | "uni-6";
//would remove this type once terra tooling is unified to that of cosmos (keplr)
export type TerraChainID = "phoenix-1" | "pisco-1";

export type SupportedChainId = EVMChainID | CosmosChainID | TerraChainID;

const unsupportedChainIds = [
  "doge-mainnet",
  "doge-testnet",
  "sol-mainnet",
  "sol-testnet",
  "xrp-mainnet",
  "xrp-testnet",
  "btc-mainnet",
  "btc-testnet",
] as const;
export type UnsupportedChainId = (typeof unsupportedChainIds)[number];

export type ChainID =
  | EVMChainID
  | CosmosChainID
  | TerraChainID
  | UnsupportedChainId;

export const chainIdIsNotSupported = (
  chainId: ChainID
): chainId is UnsupportedChainId =>
  unsupportedChainIds.includes(chainId as any);

type NativeAtomicUnit = string; //ujunox uluna
type IBCDenom = string;

export type SupportedChain = {
  isTest: boolean;
  id: SupportedChainId;
  brand: string; //
  name: string;
  rpc: string;
  lcd: string;
  blockExplorer: string;
  nativeToken: {
    id: ChainID | NativeAtomicUnit | IBCDenom;
    symbol: string;
    decimals: number;
    coinGeckoId: string;
    logo?: string;
  };
};

export type UnsupportedChain = Pick<
  SupportedChain,
  "isTest" | "name" | "blockExplorer"
> & {
  directReceiverAddr: string;
  id: UnsupportedChainId;
};
export type SupportedChains = { [K in SupportedChainId]: SupportedChain };
export type UnsupportedChains = {
  [K in UnsupportedChainId]: UnsupportedChain;
};

export type Chains = SupportedChains & UnsupportedChains;
