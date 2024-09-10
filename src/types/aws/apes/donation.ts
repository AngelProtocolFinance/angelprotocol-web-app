import type { DonationSource } from "types/lists";
import type { Ensure } from "types/utils";
import type { Token } from ".";

export namespace Donor {
  export type Title = "Mr" | "Mrs" | "Ms" | "Mx" | "";
  export interface Address {
    streetAddress: string;
    /** may be empty */
    city: string;
    state?: String;
    zipCode: string;
    country: string;
  }
}
export interface Donor {
  title?: Donor.Title;
  email: string;
  firstName: string;
  lastName: string;
  address?: Donor.Address;
  ukGiftAid?: boolean;
}

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

export type TributeNotif = {
  toFullName: string;
  toEmail: string;
  /** may be empty */
  fromMsg: string;
};

export interface DonationIntent {
  transactionId?: string;
  programId?: string;
  amount: number;
  tipAmount: number;
  feeAllowance: number;
  endowmentId: number;
  /** 1 - 100 */
  splitLiq: number;
  source: DonationSource;
  donor: Donor;
  /** honorary full name - may be empty `""` */
  inHonorOf?: string;
  tributeNotif?: TributeNotif;
}

export namespace DonationIntent {
  export type Frequency = "one-time" | "subscription";
  export interface Crypto extends DonationIntent {
    denomination: string;
    chainId: string;
    /** may be empty */
    walletAddress?: string;
    chainName: string;
  }

  export interface Fiat extends DonationIntent {
    /**ISO 3166-1 alpha-3 code. */
    currency: string;
  }

  //donation records always have transactionI

  interface ToResumeCrypto extends Ensure<Crypto, "transactionId"> {
    token: Token;
  }
  interface ToResumeFiat
    extends Ensure<Omit<Fiat, "currency">, "transactionId"> {
    currency: Currency;
    frequency: Frequency;
  }
  export type ToResume = ToResumeCrypto | ToResumeFiat;
}

export type Currency = {
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
