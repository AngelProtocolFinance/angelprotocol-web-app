declare module "@types-server/aws" {
  import { ChainIDs, Denoms } from "@types-lists";
  /**result wrapper */
  export interface AWSQueryRes<T> {
    Count: number;
    ScannedCount: number;
    Items: T;
  }

  /** /aidrops ***/
  export type Airdrops = Airdrop[];
  export type Airdrop = {
    stage: number;
    haloTokens: string; // uhalo amount
    proof: string[];
    // chainId: "bombay-12";
    // stage: 1;
    // haloTokens: "10000000";
    // proof: string[];
    // claimable: true;
    // address: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
    // pk: "bombay-12:terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
  };

  /** /aidrops */
  export interface Transaction {
    endowment_address: string; // Charity's endowment address
    wallet_address: string; // Owner's wallet address
    sort_key: string; // Transaction hash
    transaction_date: string; // "2021-12-21T08:06:13.598Z"
    amount: number; // 14.251521
    app_used: string; // "restore-earth"
    transaction_type: string; // "deposit"
    chain_id?: ChainIDs;
  }

  //payloads
  export type ReceiptPayload = {
    transactionId: string; // tx hash
    fullName: string; // "John Doe"
    email: string; // "john@doe.email.com"
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string; //2000
    country: string;
    consent_tax: boolean;
    consent_marketing: boolean;
  };

  export interface Endowment {
    endowment_address: string;
    charity_owner: string;
    charity_name: string;
    total_liq: number;
    total_lock: number;
    overall: number;
    charity_logo?: string;
    charity_overview: string;
    url: string;
    tier: number;
    iconLight?: boolean;
  }

  export interface Update {
    endowments: Endowment[];
    last_update: string;
  }

  //logDonation
  type TxDetails = {
    transactionId: string;
    transactionDate: string;
    chainId: ChainIDs;
    amount: number;
    splitLiq: string;
    walletAddress: string;
    denomination: string; //currency_text
  };

  type TxDataPermissions = {
    consent_tax?: boolean;
    consent_marketing?: boolean;
  };

  export type Receiver =
    | {
        charityId: string;
        fundId?: never;
      }
    | { fundId: number; charityId?: never };

  export type TxLogPayload = Receiver & TxDetails & TxDataPermissions;
}
