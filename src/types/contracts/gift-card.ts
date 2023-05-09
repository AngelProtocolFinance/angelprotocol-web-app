/**
 * 0 - erc20
 * 1 - native
 * 2 - none
 */
export type Asset = {
  info: 0 | 1 | 2;
  amount: string; // uint256
  addr: string;
  name: "";
};

export type GiftToSpend = {
  asset: Asset;
  id: number;
  lockedPCT: number;
  liquidPCT: number;
};
