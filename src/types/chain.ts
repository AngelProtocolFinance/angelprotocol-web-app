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

export namespace Chain {
  export namespace Id {
    export type EVM =
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

    export type Cosmos =
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
    export type Terra = "phoenix-1" | "pisco-1";

    /** supports both donation via wallet & QR */
    export type Tier1 = EVM | Cosmos | Terra;
    /** donation via QR only */
    export type Tier2 = (typeof unsupportedChainIds)[number];

    export type All = Tier1 | Tier2;
  }

  export interface Tier1 {
    logo: string;
    isTest: boolean;
    id: Id.Tier1;
    name: string;
    /** evm: rpc, cosmos: lcd */
    blockExplorer: string;
    processingRate: number;
  }

  export interface Tier2
    extends Pick<
      Tier1,
      "isTest" | "name" | "blockExplorer" | "logo" | "processingRate"
    > {
    id: Id.Tier2;
  }
}

export const tier2ChainId = (
  chainId: Chain.Id.All
): chainId is Chain.Id.Tier2 => unsupportedChainIds.includes(chainId as any);

export type Tier1Chains = { [K in Chain.Id.Tier1]: Chain.Tier1 };
export type Tier2Chains = {
  [K in Chain.Id.Tier2]: Chain.Tier2;
};

export type Chains = Tier1Chains & Tier2Chains;
