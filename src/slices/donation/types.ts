import { Donor } from "types/aws";
import { ChainID } from "types/chain";
import { Currency, OptionType } from "types/components";
import { DonationSource } from "types/lists";
import { TokenWithAmount, TxPackage } from "types/tx";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

export type DonationRecipient = {
  id: number;
  name: string;
};

type BaseDonationDetais = {
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
export type DafDonationDetails = {
  method: "daf";
} & FiatDonationDetails;

export type DonationDetails =
  | StripeDonationDetails
  | PaypalDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export function hasEmail(
  details: DonationDetails
): details is
  | StripeDonationDetails
  | PaypalDonationDetails
  | DafDonationDetails {
  return (
    details.method === "stripe" ||
    details.method === "paypal" ||
    details.method === "daf"
  );
}

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
export type DafFormStep = FormStep<DafDonationDetails>;

export type SplitsStep = {
  step: "splits";
  liquidSplitPct?: number;
} & From<FormStep>;

/** edge case: custom tip > donation  */
export type TipFormat = "pct" | "amount";
export type TipStep = {
  step: "tip";
  tip?: number;
  format?: TipFormat;
} & From<SplitsStep>;

export type SummaryStep = {
  step: "summary";
  donor?: Donor;
} & From<TipStep>;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<From<SummaryStep>, "details"> & { details: T };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type PaypalCheckoutStep = SubmitStep<PaypalDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type DafCheckoutStep = SubmitStep<DafDonationDetails>;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & From<CryptoSubmitStep>;

export type DonationState =
  | InitStep
  | FormStep
  | SplitsStep
  | TipStep
  | SummaryStep
  | SubmitStep
  | CryptoResultStep;

export type DonateArgs = { donation: CryptoSubmitStep } & TxPackage;

export type DonationStep = DonationState["step"];
