import { EndowmentTierNum } from "types/shared/registration";

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
  ust_amount: number; // 14.251521
  chain_id?: string;
  donator: string;
}

/** apes/donation */
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

type CryptoTxDetails = {
  walletAddress: string; //user wallet address, undefined for
  fiatRamp?: never;
  paymentMethod?: never;

  transactionId: string;
  transactionDate: string;
  chainId: string;
  amount: number;
  splitLiq: string; //"50"
  denomination: string; //currency_text "UST", "LUNA"
};

type FiatTxDetails = {
  walletAddress?: never;
  fiatRamp: string;
  //payment methods
  //https://www.notion.so/6cbdfa08522e444fadd732d73a7e15ad?v=68fdb3f0310d42e0b7cb28684449bb81
  paymentMethod: string;

  transactionId: string;
  transactionDate: string;
  chainId: string;
  amount: number;
  splitLiq: string; //"50"
  denomination: string; //currency_text "UST", "LUNA"
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
  | { fundId: number | undefined; charityId?: never };

export type TxLogPayload = Receiver &
  (CryptoTxDetails | FiatTxDetails) &
  TxDataPermissions;

/** apes/token-list */
export type TerraNative = {
  type: "terra-native"; //uluna
  symbol: string; //LUNA
  logo: string;
  decimals: number; //6
  chainId: string; // "pisco-1" | "phoenix-1"

  //additional info for adding chain in wallet
  chainName: string; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  contractAddr?: never;
  nativeSymbol?: never;
};

export type ALT20 = {
  type: "cw20" | "erc20";
  symbol: string; //HALO
  logo: string;
  decimals: number; //6
  chainId: string; // "pisco-1" | "phoenix-1"

  //additional info for adding chain in wallet
  chainName?: never; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  //info if token is an ERC20 token
  contractAddr: string;
  nativeSymbol: string;
};

export type EVMNative = {
  type: "evm-native"; //avax
  symbol: string; //AVAX
  logo: string;
  decimals: number; //18
  chainId: string; // "1"-mainnet "97"-binance-test "43017"-avax

  //additional info for adding chain in wallet
  chainName: string; //Avalanche
  rpcUrl: string;
  blockExplorerUrl: string; //https://testnet.snowtrace.io
  tokens: {
    contractAddr: string;
    logo: string;
  }[];

  //info if token is an ERC20 token
  contractAddr?: never;
  nativeSymbol?: never;
};

export type Token = EVMNative | TerraNative | ALT20;

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
  TerraWallet: string;
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

//*
export type Charity = {
  ContactPerson: ContactPerson;
  Metadata: Metadata;
  Registration: Registration;
};

//*
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

export type Metadata = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  EndowmentContract: string;
  SK: "Metadata";
  TerraWallet: string;
  KycDonorsOnly: boolean;
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
    TerraWallet?: string;
  };
};

export type UpdateCharityMetadataResult = {
  Banner: FileObject;
  CharityLogo: FileObject;
  CharityOverview: string;
  TerraWallet: string;
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
