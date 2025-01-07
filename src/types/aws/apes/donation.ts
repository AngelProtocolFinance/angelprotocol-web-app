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
