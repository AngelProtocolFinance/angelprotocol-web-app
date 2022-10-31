export type Donation = {
  amount: number;
  chainId: string;
  date: string;
  hash: string;
  symbol: string;
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
  charityId: number;
  denomination: string;
  splitLiq: string; //"50"
  transactionId: string;
  transactionDate: string;
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

export type TxLogPayload = TxDetails & { kycData?: KYCData };
