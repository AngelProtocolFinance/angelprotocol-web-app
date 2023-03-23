import { Country } from "types/countries";
import { EstimatedTx } from "slices/donation";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };

export type FiatDonateValues = {
  name: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  country: Country;
  paymentOption: string;
};
