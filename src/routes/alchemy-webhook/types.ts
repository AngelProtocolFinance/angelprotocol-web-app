export type TAlchemyChainId = "bnb-mainnet" | "eth-mainnet";

interface IActivity {
  /** sender wallet address  */
  fromAddress: string;
  /** recipient wallet address */
  toAddress: string;
  hash: string;
  /** condensed */
  value: number;
  /** contract SYMBOL or ETH (native transfer) */
  asset: string;
  category: "token" | "external" | (string & {});
  rawContract: {
    // contract address
    address?: string; // only present for token transfers
    decimals: string;
  };
}
export interface IPayload {
  event: {
    /** synonymous to path :chain_id e.g. BNB_MAINNET, ETH_MAINNET */
    network: string;
    activity: IActivity[];
  };
}
