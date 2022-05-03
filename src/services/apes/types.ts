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

export type TxDataPermissions = {
  consent_tax?: boolean;
  consent_marketing?: boolean;
};

export type Receiver =
  | {
      charityId: string;
      fundId?: never;
    }
  | { fundId: number | undefined; charityId?: never };

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

export type TxLogPayload = Receiver &
  (CryptoTxDetails | FiatTxDetails) &
  TxDataPermissions;
