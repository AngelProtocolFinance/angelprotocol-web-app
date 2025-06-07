import type { Donor, DonorTitle } from "@better-giving/donation/intent";
import type { DonateMethodId } from "@better-giving/endowment";
import { plusInt } from "api/schema/endow-id";
import type {
  DetailedCurrency,
  OptionType,
  TokenWithDetails,
} from "types/components";
import type { DonationSource } from "types/lists";
import type { Increment } from "types/widget";
export type { DetailedCurrency } from "types/components";
import * as v from "valibot";

export type Frequency = "one-time" | "subscription";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

const uuid = v.pipe(v.string(), v.trim(), v.uuid());
export const recipientId = v.pipe(
  v.union([uuid, plusInt]),
  v.transform((x) => x.toString())
);
export const donationRecipient = v.object({
  id: v.fallback(recipientId, "1"),
  name: v.fallback(v.pipe(v.string(), v.nonEmpty()), "Better Giving"),
  hide_bg_tip: v.optional(v.boolean()),
  progDonationsAllowed: v.optional(v.boolean()),
});
export const isFund = (recipient: string) =>
  v.safeParse(uuid, recipient).success; //is uuid

export interface DonationRecipient
  extends v.InferOutput<typeof donationRecipient> {}

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
  frequency: Frequency;
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

export type FormDonor = Pick<
  Donor,
  "email" | "first_name" | "last_name" | "company_name"
> & {
  ukTaxResident: boolean;

  title: OptionType<DonorTitle>;
  /** initially empty `''` */
  zipCode: string;
  /** initially empty `''` */
  streetAddress: string;

  isPublic: boolean;
  /** initially empty `''` */
  publicMsg: string;
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
