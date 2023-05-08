export type Donation = {
  amount: number;
  chainId: string;
  destinationChainId: string;
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
export type DonationsQueryParams = {
  id: string;
  chain_id: string;
  afterDate?: string;
  beforeDate?: string;
  chainName?: string;
  denomination?: string;
  status?: string;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request
};

export type TxLogPayload = {
  amount: number;
  chainId: string;
  destinationChainId: string;
  chainName: string;
  charityName: string;
  denomination: string;
  splitLiq: string; //"50"
  transactionId: string;
  transactionDate: string;
  endowmentId: number;
  walletAddress: string;
  kycData?: KYCData;
};
