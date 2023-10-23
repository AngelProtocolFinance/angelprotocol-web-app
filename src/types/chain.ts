export type EVMChainID =
  //polygon
  | "137"
  | "80001"
  //ethereum
  | "1"
  | "5"
  //binance
  | "56"
  | "97";

export type CosmosChainID = "juno-1" | "uni-6";
//would remove this type once terra tooling is unified to that of cosmos (keplr)
export type TerraChainID = "phoenix-1" | "pisco-1";

export type ChainID = EVMChainID | CosmosChainID | TerraChainID;
type NativeAtomicUnit = string; //ujunox uluna
type IBCDenom = string;

export type Chain = {
  id: ChainID;
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
  };
};

export type Chains = Record<ChainID, Chain>;
