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
  | "97"
  //optimism
  | "10"
  | "11155420"
  //base
  | "8453"
  | "84532";

export type CosmosChainID =
  //juno
  | "juno-1"
  | "uni-6"
  //kujira
  | "kaiyo-1"
  | "harpoon-4"
  //osmosis
  | "osmosis-1"
  | "osmo-test-5"
  //stargaze
  | "stargaze-1"
  | "elgafar-1";
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
  logo: string;
  isTest: boolean;
  id: SupportedChainId;
  coingeckoPlatformId: string;
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
  processingRate: number;
};

export type UnsupportedChain = Pick<
  SupportedChain,
  "isTest" | "name" | "blockExplorer" | "logo" | "processingRate"
> & {
  id: UnsupportedChainId;
  /** null: erc20 token doesn't exist */
  coingeckoPlatformId: string | null;
};
export type SupportedChains = { [K in SupportedChainId]: SupportedChain };
export type UnsupportedChains = {
  [K in UnsupportedChainId]: UnsupportedChain;
};

export type Chains = SupportedChains & UnsupportedChains;
