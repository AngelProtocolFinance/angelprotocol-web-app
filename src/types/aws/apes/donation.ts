import { DonationSource } from "types/lists";

export type Donor = {
  email: string;
  firstName: string;
  lastName: string;
};

export type GuestDonor = {
  email: string;
  fullName: string;
};

export type ReceiptPayload = {
  fullName: string; // "John Doe"
  kycEmail: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
  transactionId: string; // tx hash
};

export type CryptoDonation = {
  amount: number;
  tipAmount: number;
  denomination: string;
  endowmentId: number;
  chainId: string;
  walletAddress: string;
  /** 1 - 100 */
  splitLiq: number;
  chainName: string;
  source: DonationSource;
  donor: Donor;
};

type Currency = {
  /** ISO 3166-1 alpha-3 code */
  currency_code: string;
  minimum_amount: number;
  /** unit/usd */
  rate: number;
};

export type FiatCurrencyData = {
  default?: Currency;
  currencies: Currency[];
};
