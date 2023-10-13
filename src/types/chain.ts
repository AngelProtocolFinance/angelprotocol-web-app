type ChainID = string; //"137", "1"
type NativeAtomicUnit = string; //ujunox uluna
export type ChainType = "evm" | "cosmos" | "terra";
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
    coinGeckoId: string;
  };
};

export type Chains = Record<ChainID, Chain>;
