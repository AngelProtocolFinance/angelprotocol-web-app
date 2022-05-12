import { chainIDs } from "constants/chainIDs";

export interface Transaction {
  name: string;
  tx_id: string; // Transaction hash
  block_timestamp: string; // "2021-12-21T08:06:13.598Z"
  ust_amount: number; // 14.251521
  chain_id?: chainIDs;
  donator: string;
}

export interface DonationQueryRes<T> {
  transactions: T;
}
