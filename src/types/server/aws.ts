/**result wrapper */
export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

/** shared */
export type EndowmentTierNum = 1 | 2 | 3;

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

type ERC20Token = {
  contractAddr: string;
  logo: string;
};

export type NativeToken = {
  min_denom: string; //avax
  symbol: string; //AVAX
  logo: string;
  decimals: number; //18
  chainId: string; // "1"-mainnet "97"-binance-test "43017"-avax

  //additional info for adding chain in wallet
  rpcUrl: string;
  chainName: string; //Avalanche
  blockExplorerUrl: string; //https://testnet.snowtrace.io

  erc20Tokens: ERC20Token[];
};

/** /endowments */
export interface Profile {
  //terra
  charity_owner: string; // charity owner wallet address
  endowment_address: string; //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  total_liq: number;
  total_lock: number;
  overall: number;

  //landing
  un_sdg: string; //"4"
  charity_name: string; //"Yellow Boat of Hope Foundation"
  charity_image: string; //url of image
  charity_overview: string; //long text
  charity_registration_number: string; //"CN201225725"
  country_city_origin: string; //"Philippines, Zamboanga City"

  //stats
  average_annual_budget: string; //"$50,000"
  annual_revenue: string; //"Under $100k"
  number_of_employees: string; //"5-25"

  //contacts
  charity_email: string; //"jay@yellowboat.org"

  //social
  url?: string; //
  linkedin_page: string; //"yellowboatph" used as https://linked.com/{linkedin_page}
  twitter_handle: string; //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  facebook_page: string; // "YellowBoatPH" used as https://facebook.com/{facebook_page}

  //content
  charity_programs: string; //long text
  charity_navigator_rating: string; //""
  news_media_articles: string; //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""

  //meta
  tier?: EndowmentTierNum;
}

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
  tier: EndowmentTierNum;
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
  KycDonorsOnly: boolean;
  SK: "Metadata";
  TerraWallet: string;
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
