import { AccAddress } from "@terra-money/terra.js";

export enum chains {
  testnet = "bombay-12",
  mainnet = "columbus-5",
  localterra = "localterra",
}

export type ContractAddrs = {
  [index: string]: AccAddress;
};

export interface TCAList {
  tca_members: string[];
}
export type Donation = { address: string; total_ust: string };
export interface Donors {
  donors: Donation[];
}
