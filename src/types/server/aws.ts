import { EndowmentTierNum } from "types/shared/registration";
import { Optional } from "types/utils";

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

/** flipside */
export interface Transaction {
  name: string;
  tx_id: string; // Transaction hash
  block_timestamp: string; // "2021-12-21T08:06:13.598Z"
  usd_amount: number; // 14.251521
  chain_id?: string;
  donator: string;
}

/** apes/donation */

export type KYCData = {
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

export type ReceiptPayload = KYCData & {
  transactionId: string; // tx hash
};

type TxBase = {
  transactionId: string;
  transactionDate: string;
  chainId: string;
  amount: number;
  splitLiq: string; //"50"
  denomination: string;
};

type CryptoTx = TxBase & {
  walletAddress: string; //user wallet address, undefined for
  fiatRamp?: never;
  paymentMethod?: never;
};

type FiatTx = TxBase & {
  walletAddress?: never;
  fiatRamp: string;
  //payment methods
  //https://www.notion.so/6cbdfa08522e444fadd732d73a7e15ad?v=68fdb3f0310d42e0b7cb28684449bb81
  paymentMethod: string;
};

type TxDetails = FiatTx | CryptoTx;

export type Receiver =
  | {
      charityId: string;
      fundId?: never;
    }
  | { fundId: number | undefined; charityId?: never };

export type TxLogPayload = Receiver & TxDetails & { kycData?: KYCData };

export type Token = {
  approved: boolean; // true
  balance: number; // 0 --> not returned by APES but dynamically calculated and set
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  name: string; // "Stader LunaX Token"
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  type:
    | "juno-native"
    | "terra-native"
    | "evm-native"
    | "erc20"
    | "cw20"
    | "ibc"
    | "placeholder";
};

export type NetworkType = "mainnet" | "testnet";

// APES chain type returned by /chain/{chain_id}
export type Chain = {
  block_explorer_url: string; // https://testnet.snowtrace.io
  chain_id: string;
  lcd_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  chain_name: string; // Avalanche Fuji Testnet
  native_currency: Token;
  network_type: NetworkType;
  rpc_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  tokens: Token[];
  type: "juno-native" | "terra-native" | "evm-native" | "placeholder"; // | "sol" | "btc" | ...
};

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

export interface Update {
  endowments: Endowment[];
  last_update: string;
}

/** /registration */
export type RegistrationStatus =
  | "Inactive"
  | "Under Review"
  | "Approved"
  | "Active";
export type ApplicationStatus = "approved" | "not-complete" | "under-review";
export type ApplicationStatusOptions = ApplicationStatus | "all";

export type ReferralMethods =
  | "angel-alliance"
  | "discord"
  | "facebook"
  | "linkedin"
  | "medium"
  | "press"
  | "search-engines"
  | "twitter"
  | "other";

export type ContactRoles =
  | "board-member"
  | "ceo"
  | "cfo"
  | "communications"
  | "fundraising-finance"
  | "leadership-team"
  | "legal"
  | "other"
  | "president"
  | "secretary"
  | "treasurer"
  | "vice-president";

export interface CharityApplication {
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
  RegistrationStatus: RegistrationStatus;
  SK: string;
  JunoWallet: string;
  poll_id?: number;
}

export type ContactPerson = {
  Email: string;
  EmailVerified?: boolean;
  Goals: string;
  FirstName: string;
  LastName: string;
  OtherRole?: string;
  OtherReferralMethod?: string;
  PhoneNumber: string;
  PK?: string;
  ReferralMethod: ReferralMethods;
  Role: ContactRoles;
  SK: "ContactPerson";
};

export type FileObject = {
  name: string;
  publicUrl?: string;
};

type InitialRegistration = Optional<
  Registration,
  | "AuditedFinancialReports"
  | "AuditedFinancialReportsVerified"
  | "FinancialStatements"
  | "FinancialStatementsVerified"
  | "ProofOfIdentity"
  | "ProofOfIdentityVerified"
  | "ProofOfRegistration"
  | "ProofOfRegistrationVerified"
  | "Website"
>;
export type Registration = {
  AuditedFinancialReports: FileObject[];
  AuditedFinancialReportsVerified: boolean;
  CharityName: string;
  CharityName_ContactEmail?: string;
  FinancialStatements: FileObject[];
  FinancialStatementsVerified: boolean;
  ProofOfIdentity: FileObject;
  ProofOfIdentityVerified: boolean;
  ProofOfRegistration: FileObject;
  ProofOfRegistrationVerified: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK: "Registration";
  Tier?: EndowmentTierNum;
  UN_SDG: number;
  Website: string;
};

type InitialMetaData = Optional<
  Metadata,
  | "Banner"
  | "CharityLogo"
  | "CharityOverview"
  | "EndowmentContract"
  | "JunoWallet"
  | "KycDonorsOnly"
>;
export type Metadata = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  EndowmentContract: string;
  SK: "Metadata";
  JunoWallet: string;
  KycDonorsOnly: boolean;
};

export type Charity = {
  ContactPerson: ContactPerson;
  Metadata: Metadata;
  Registration: Registration;
};

export type UnprocessedCharity = {
  ContactPerson: ContactPerson;
  Registration: InitialRegistration;
  Metadata: InitialMetaData;
};

export type ContactDetailsData = {
  ContactPerson: ContactPerson;
  Registration: Pick<
    Registration,
    | "CharityName"
    | "CharityName_ContactEmail"
    | "RegistrationDate"
    | "RegistrationStatus"
  >;
};

//*
export type ContactDetailsRequest = {
  PK?: string;
  body: {
    ContactPerson: Omit<ContactPerson, "EmailVerified" | "SK">;
    Registration: Pick<Registration, "CharityName">;
  };
};

//*
export type SubmitData = {
  PK: string;
  EndowmentContract: string;
};

//*
export type SubmitResult = {
  RegistrationStatus: RegistrationStatus;
  EndowmentContract: string;
};

export type UpdateCharityMetadataData = {
  PK?: string;
  body: {
    Banner?: FileObject;
    CharityLogo?: FileObject;
    CharityOverview?: string;
    JunoWallet?: string;
  };
};

export type UpdateCharityMetadataResult = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  JunoWallet: string;
};

export type UpdateDocumentationData = {
  PK?: string;
  body: {
    Website: string;
    UN_SDG: number;
    ProofOfIdentity: FileObject;
    ProofOfRegistration: FileObject;
    FinancialStatements: FileObject[];
    AuditedFinancialReports: FileObject[];
  };
};

export type UpdateDocumentationResult = {
  Tier: EndowmentTierNum;
  Website: string;
  UN_SDG: number;
  ProofOfIdentity: FileObject;
  ProofOfRegistration: FileObject;
  FinancialStatements: FileObject[];
  AuditedFinancialReports: FileObject[];
};
