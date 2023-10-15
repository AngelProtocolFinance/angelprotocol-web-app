export type ChainID =
  //polygon
  | "137"
  | "80001"
  //ethereum
  | "1"
  | "5"
  //binance
  | "56"
  | "97"
  //juno
  | "juno-1"
  | "uni-6"
  //terra
  | "phoenix-1"
  | "pisco-1";
type NativeAtomicUnit = string; //ujunox uluna
type IBCDenom = string;
export type ChainType = "evm" | "cosmos" | "terra";
export type Chain = {
  id: ChainID;
  type: ChainType;
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
