type ChainID = string; //"137", "1"
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
