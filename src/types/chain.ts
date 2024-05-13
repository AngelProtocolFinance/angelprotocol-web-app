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

export type UnsupportedChainId = "xrp" | "solana" | "btc";

export type ChainID =
  | EVMChainID
  | CosmosChainID
  | TerraChainID
  | UnsupportedChainId;
type NativeAtomicUnit = string; //ujunox uluna
type IBCDenom = string;
type ReceiverAddr = string;

export type Chain = {
  isTest: boolean;
  id: ChainID;
  brand: string; //
  name: string;
  rpc: string;
  lcd: string;
  blockExplorer: string;
  nativeToken: {
    id: ChainID | NativeAtomicUnit | IBCDenom | ReceiverAddr;
    symbol: string;
    decimals: number;
    coinGeckoId: string;
  };
};

export type Chains = Record<ChainID, Chain>;
