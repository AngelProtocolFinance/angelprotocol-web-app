export type Donation = {
  amount: number;
  chainId: string;
  chainName: string;
  charityName: string;
  date: string;
  donationFinalized: boolean;
  hash: string;
  id: string; // charity ID
  symbol: string;
  usdValue: number;
  kycData?: KYCData;
};

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
  amount: number;
  chainId: string;
  chainName: string;
  charityName: string;
  denomination: string;
  splitLiq: string; //"50"
  transactionId: string;
  transactionDate: string;
  endowmentId: number;
};

type CryptoTx = TxBase & {
  walletAddress: string; //user wallet address, undefined for
};

type FiatTx = TxBase & {
  fiatRamp: string;
  destinationChainId: string;
  //payment methods
  //https://www.notion.so/6cbdfa08522e444fadd732d73a7e15ad?v=68fdb3f0310d42e0b7cb28684449bb81
  paymentMethod: string;
};

export type DonationsQueryParams = {
  id: string;
  afterDate?: string;
  beforeDate?: string;
  chainName?: string;
  denomination?: string;
  status?: string;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request
};

export type TxLogPayload = CryptoTx & { kycData?: KYCData };
export type FiatLogPayload = FiatTx & { kycData?: KYCData };
