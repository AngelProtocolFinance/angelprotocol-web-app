import type { DonationIntent, Donor, Endowment } from "types/aws";
import type {
  DetailedCurrency,
  OptionType,
  TokenWithDetails,
} from "types/components";
import type { DonateMethodId, DonationSource } from "types/lists";
import type { Increment } from "types/widget";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

export type DonationRecipient = Pick<
  Endowment,
  "id" | "name" | "hide_bg_tip" | "progDonationsAllowed"
>;

type BaseDonationDetails = {
  /** value is "" if no program is selected   */
  program: OptionType<string>;
};

export type CryptoDonationDetails = BaseDonationDetails & {
  method: Extract<DonateMethodId, "crypto">; //use to preserve selected method
  token: TokenWithDetails;
};

type FiatDonationDetails = BaseDonationDetails & {
  amount: string;
  currency: DetailedCurrency;
};

export type StripeDonationDetails = {
  method: Extract<DonateMethodId, "stripe">;
  frequency: DonationIntent.Frequency;
} & FiatDonationDetails;

export type StocksDonationDetails = BaseDonationDetails & {
  method: Extract<DonateMethodId, "stocks">;
  symbol: string;
  numShares: string;
};
export type DafDonationDetails = {
  method: Extract<DonateMethodId, "daf">;
} & FiatDonationDetails;

export type DonationDetails =
  | StripeDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export type Mode = "live" | "preview";

export type Config = {
  /** donation tabs follows the list order */
  methodIds?: DonateMethodId[];
  /** hex color without alpha */
  accentPrimary?: string;
  /** hex color without alpha */
  accentSecondary?: string;
  increments?: Increment[];
};

export type Init = {
  source: DonationSource;
  mode: Mode;
  recipient: DonationRecipient;
  config: Config | null;
  /** intent to resume */
  intentId?: string;
};

export type FormStep<T extends DonationDetails = DonationDetails> = {
  step: "donate-form";
  init: Init;
  details?: T;
};

export type StripeFormStep = FormStep<StripeDonationDetails>;
export type CryptoFormStep = FormStep<CryptoDonationDetails>;
export type StockFormStep = FormStep<StocksDonationDetails>;
export type DafFormStep = FormStep<DafDonationDetails>;

/** edge case: custom tip > donation  */
export type TipFormat = "pct" | "amount";
export type TipStep = {
  step: "tip";
  //tip can be skipped
  tip?: { value: number; format: TipFormat };
} & From<FormStep>;

export type FormDonor = Pick<Donor, "email" | "firstName" | "lastName"> & {
  ukTaxResident: boolean;

  title: OptionType<Donor.Title>;
  /** initially empty `''` */
  zipCode: string;
  /** initially empty `''` */
  streetAddress: string;
};

export type TributeNotif = {
  toFullName: string;
  toEmail: string;
  /** may be empty */
  fromMsg: string;
};

export type Honorary = {
  withHonorary: boolean;
  /** initially empty `''` */
  honoraryFullName: string;
  withTributeNotif: boolean;
  tributeNotif: TributeNotif;
};

export type SummaryStep = {
  step: "summary";
  donor?: FormDonor;
  honorary?: Honorary;
  feeAllowance?: number;
} & From<TipStep, "tip">;

export type FinishedSummaryData = Required<
  Pick<SummaryStep, "donor" | "honorary" | "feeAllowance">
>;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<From<SummaryStep, "tip">, "details"> & { details: T };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type DafCheckoutStep = SubmitStep<DafDonationDetails>;

export type DonationState = FormStep | TipStep | SummaryStep | SubmitStep;
