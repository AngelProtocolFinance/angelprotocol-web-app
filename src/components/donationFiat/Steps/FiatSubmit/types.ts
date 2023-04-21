import { Country } from "types/countries";

export type Fee = { amount: number; symbol: string };

export type FiatDonateValues = {
  name: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  country: Country;
  paymentOption?: string;
};
