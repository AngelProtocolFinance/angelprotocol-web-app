import { UNSDG_NUMS } from "types/lists";

export enum EndowmentStatus {
  Inactive,
  Approved,
  Frozen,
  Closed,
}

/**
 * 0 Endowment
 * 1 IndexFund
 * 2 Wallet
 * 3 None
 */
export type Beneficiary = {
  data: {
    id: number; //for index-fund or endowment
    addr: string; // wallet
  };
  enumData: 0 | 1 | 2 | 3;
};

export type EndowmentStatusText = Lowercase<keyof typeof EndowmentStatus>;
export type EndowmentTierNum = 1 | 2 | 3;

export type Categories = {
  sdgs: UNSDG_NUMS[]; // u8 maps one of the 17 UN SDG
  general: number[]; //??
};

export type Asset = {
  info: { native: string } | { cw20: string };
  amount: string;
};
