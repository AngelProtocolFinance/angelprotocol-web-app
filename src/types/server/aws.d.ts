declare module "@types-server/aws" {
  import { EndowmentTierNum } from "@types-shared/registration";
  import { ChainIDs, Denoms } from "@types-lists";
  /**result wrapper */
  interface AWSQueryRes<T> {
    Count: number;
    ScannedCount: number;
    Items: T;
  }

  /** /airdrop */
  type Airdrops = Airdrop[];
  type Airdrop = {
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
  interface Transaction {
    name: string;
    tx_id: string; // Transaction hash
    block_timestamp: string; // "2021-12-21T08:06:13.598Z"
    ust_amount: number; // 14.251521
    chain_id?: chainIDs;
    donator: string;
  }

  /** apes/donation */
  type ReceiptPayload = {
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

  type Receiver =
    | {
        charityId: string;
        fundId?: never;
      }
    | { fundId: number | undefined; charityId?: never };

  type TxLogPayload = Receiver &
    (CryptoTxDetails | FiatTxDetails) &
    TxDataPermissions;

  /** apes/token-list */
  type Token = {
    min_denom: string;
    symbol: string;
    cw20_contract?: {
      mainnet: string;
      testnet?: string;
    };
    logo: string;
    decimals: number;
  };

  /** /leaderboards */
  interface Endowment {
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

  type ApplicationStatus = "approved" | "not-complete" | "under-review";
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
    poll_id?: number;
  }

  type ContactPerson = {
    Email: string;
    EmailVerified?: boolean;
    FirstName: string;
    LastName: string;
    OtherRole?: string;
    PhoneNumber: string;
    PK?: string;
    Role: ContactRoles;
    SK: "ContactPerson";
  };

  type FileObject = {
    name: string;
    publicUrl?: string;
  };

  type RegistrationStatus = "Inactive" | "Under Review" | "Approved" | "Active";
  type Registration = {
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
  type Charity = {
    ContactPerson: ContactPerson;
    Metadata: Metadata;
    Registration: Registration;
  };

  //*
  type ContactDetailsData = {
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
  type ContactDetailsRequest = {
    PK?: string;
    body: {
      ContactPerson: Omit<ContactPerson, "EmailVerified" | "SK">;
      Registration: Pick<Registration, "CharityName">;
    };
  };

  type Metadata = {
    Banner: FileObject;
    CharityLogo: FileObject;
    CharityOverview: string;
    EndowmentContract: string;
    SK: "Metadata";
    TerraWallet: string;
  };

  //*
  type SubmitData = {
    PK: string;
    EndowmentContract: string;
  };

  //*
  type SubmitResult = {
    RegistrationStatus: RegistrationStatus;
    EndowmentContract: string;
  };

  interface UpdateApplication {
    PK: string;
    poll_id: string;
    chain_id: string;
  }

  type UpdateCharityMetadataData = {
    PK?: string;
    body: {
      Banner?: FileObject;
      CharityLogo?: FileObject;
      CharityOverview?: string;
      TerraWallet?: string;
    };
  };

  type UpdateCharityMetadataResult = {
    Banner: FileObject;
    CharityLogo: FileObject;
    CharityOverview: string;
    TerraWallet: string;
  };

  type UpdateDocumentationData = {
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

  type UpdateDocumentationResult = {
    Tier: EndowmentTierNum;
    Website: string;
    UN_SDG: number;
    ProofOfIdentity: FileObject;
    ProofOfRegistration: FileObject;
    FinancialStatements: FileObject[];
    AuditedFinancialReports: FileObject[];
  };
}
