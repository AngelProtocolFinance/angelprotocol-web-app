import { ChainID } from "types/chain";
import { Currency, OptionType } from "types/components";
import { Country } from "types/components";
import { DonationSource } from "types/lists";
import { TokenWithAmount, TxPackage } from "types/tx";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
  isFiscalSponsored: boolean;
};

type BaseDonationDetais = {
  userOptForKYC: boolean;
  source: DonationSource;
};

export type CryptoDonationDetails = BaseDonationDetais & {
  method: "crypto"; //use to preserve selected method
  token: TokenWithAmount;
  chainId: OptionType<ChainID>;
};

type FiatDonationDetails = BaseDonationDetais & {
  amount: string;
  currency: Currency;
  email: string;
};

export type StripeDonationDetails = {
  method: "stripe";
} & FiatDonationDetails;

export type PaypalDonationDetails = {
  method: "paypal";
} & FiatDonationDetails;

export type StocksDonationDetails = {
  method: "stocks";
  symbol: string;
  numShares: number;
};
export type ChariotDonationDetails = {
  method: "chariot";
} & FiatDonationDetails;

export type DonationDetails =
  | StripeDonationDetails
  | PaypalDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | ChariotDonationDetails;

export function hasEmail(
  details: DonationDetails
): details is
  | StripeDonationDetails
  | PaypalDonationDetails
  | ChariotDonationDetails {
  return (
    details.method === "stripe" ||
    details.method === "paypal" ||
    details.method === "chariot"
  );
}

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: Country;
  state: string;
  usState: OptionType<string>;
  kycEmail: string;
};

type InitStep = {
  step: "init";
  recipient?: DonationRecipient;
};

export type FormStep<T extends DonationDetails = DonationDetails> = {
  step: "donate-form";
  details?: T;
} & From<InitStep>;

export type StripeFormStep = FormStep<StripeDonationDetails>;
export type CryptoFormStep = FormStep<CryptoDonationDetails>;
export type PaypalFormStep = FormStep<PaypalDonationDetails>;
export type StockFormStep = FormStep<StocksDonationDetails>;
export type ChariotFormStep = FormStep<ChariotDonationDetails>;

//KYC step need not know donation details
export type KYCStep = {
  step: "kyc-form";
  recipient: DonationRecipient;
  kyc?: KYC;
} & From<FormStep<DonationDetails>>;

export type SplitsStep = {
  step: "splits";
  liquidSplitPct?: number;
} & From<KYCStep, "kyc">;

/** edge case: custom tip > donation  */
export type TipFormat = "pct" | "amount";
export type TipStep = {
  step: "tip";
  tip?: number;
  format?: TipFormat;
} & From<SplitsStep, "kyc">;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<From<TipStep, "kyc" | "tip">, "details"> & { details: T };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type PaypalCheckoutStep = SubmitStep<PaypalDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type ChariotCheckoutStep = SubmitStep<ChariotDonationDetails>;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & From<CryptoSubmitStep>;

export type DonationState =
  | InitStep
  | FormStep
  | KYCStep
  | SplitsStep
  | TipStep
  | SubmitStep
  | CryptoResultStep;

export type DonateArgs = { donation: CryptoSubmitStep } & TxPackage;

export type DonationStep = DonationState["step"];
