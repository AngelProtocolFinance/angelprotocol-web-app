export interface ReceiptFormInput {
  transactionId: string; // tx hash
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
}

export type Receiver =
  | {
      charityId: string;
      fundId?: never;
    }
  | { fundId: number; charityId?: never };

export type MetaData = {
  chainId: string;
  transactionDate: string;
  amount: string;
  splitLiq: string;
  denomination: string;
};

export type ReceiptPayload = ReceiptFormInput & Receiver & MetaData;

/**
 * transactionDate: string; // e.g new Date().toISOString()
  transactionId: string; // tx hash
  amount: number; // e.g 1000 (shown in form as 1000 UST)
  splitLiq: string; // % of total amount to be split into the Liquid account (remaining % goes into Locked account)
  chainId?: string; //e.g "columbus-5", "bombay-12" or one of chainIDs enum values
  fundId?: number | string; // fundId or charityAddress
  charityId?: number | string; // fundId or charityAddress
  fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
  denomination: string; //"UST"
 */
