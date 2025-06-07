export type ReceiptPayload = {
  fullName: string; // "John Doe"
  kycEmail: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
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
