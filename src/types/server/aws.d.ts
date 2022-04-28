declare module "@types-server/aws" {
  import { ChainIDs, Denoms } from "@types-lists";
  /**result wrapper */
  export interface AWSQueryRes<T> {
    Count: number;
    ScannedCount: number;
    Items: T;
  }

  /** /airdrop */
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

  /** /transactions */
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

  /** /apes/donation */
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

  type Receiver =
    | {
        charityId: string;
        fundId?: never;
      }
    | { fundId: number; charityId?: never };

  type TxLogPayload = Receiver & TxDetails & TxDataPermissions;

  /** /leaderboards */
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

  interface Update {
    endowments: Endowment[];
    last_update: string;
  }

  /** /registration */
  interface CharityApplication {
    CharityName: string;
    CharityName_ContactEmail: string;
    EndowmentAgreement: string;
    EndowmentAgreementVerified: boolean;
    PK: string;
    ProofOfEmployment: string;
    ProofOfEmploymentVerified: boolean;
    ProofOfIdentity: string;
    ProofOfIdentityVerified: boolean;
    RegistrationDate: string;
    RegistrationStatus: string;
    SK: string;
    TerraWallet: string;
    poll_id: number;
  }

  type RegistrationStatus = "approved" | "not-complete" | "under-review";
}
