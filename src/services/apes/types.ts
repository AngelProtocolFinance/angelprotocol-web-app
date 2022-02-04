export type TxDetails = {
  transactionId: string;
  transactionDate: string;
  chainId: string;
  amount: string;
  splitLiq: string;
  denomination: string;
};

export type Receiver =
  | {
      charityId: string;
      fundId?: never;
    }
  | { fundId: number; charityId?: never };

export type ReceiptPayload = {
  transactionId: string; // tx hash
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
};

export type TxLogPayload = Receiver & TxDetails;
