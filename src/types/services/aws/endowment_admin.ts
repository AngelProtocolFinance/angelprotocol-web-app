import { chainIDs } from "types/chainIDs";

export interface Transaction {
  endowment_address: string; // Charity's endowment address
  wallet_address: string; // Owner's wallet address
  sort_key: string; // Transaction hash
  transaction_date: string; // "2021-12-21T08:06:13.598Z"
  amount: number; // 14.251521
  app_used: string; // "restore-earth"
  transaction_type: string; // "deposit"
  chain_id?: chainIDs;
}

export interface DonationQueryRes<T> {
  transactions: T;
}
