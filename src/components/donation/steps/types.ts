import type { DonateMethodId } from "@better-giving/endowment";
import { $int_gte1, type IIncrement } from "@better-giving/schemas";
import type { ITokenFv } from "types/components";
import { currency_fv } from "types/currency";
import {
  type Donor,
  type Tribute,
  frequency,
  str,
} from "types/donation-intent";
export {
  type Tribute,
  type TFrequency,
  type Donor,
  tribute,
  donor,
} from "types/donation-intent";
import type { DonationSource } from "types/lists";
import * as v from "valibot";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

const uuid = v.pipe(v.string(), v.trim(), v.uuid());
export const recipient_id = v.pipe(
  v.union([uuid, $int_gte1]),
  v.transform((x) => x.toString())
);
export const donation_recipient = v.object({
  id: v.fallback(recipient_id, "1"),
  name: v.fallback(v.pipe(v.string(), v.nonEmpty()), "Better Giving"),
  /** int-str array */
  members: v.array(v.string()),
  hide_bg_tip: v.optional(v.boolean()),
});
export const is_fund = (recipient: string) => v.UUID_REGEX.test(recipient); //is uuid

export interface DonationRecipient
  extends v.InferOutput<typeof donation_recipient> {}

export const program_opt = v.object({
  label: v.string(),
  value: v.string(),
});

export interface ProgramOption extends v.InferOutput<typeof program_opt> {}

export type CryptoDonationDetails = {
  method: Extract<DonateMethodId, "crypto">; //use to preserve selected method
  token: ITokenFv;
};

export const amount = ({ required = false } = {}) =>
  v.lazy((x) => {
    if (!x && !required) return v.string();
    if (!x && required) {
      return v.pipe(v.string(), v.nonEmpty("Please enter an amount"));
    }
    return v.pipe(
      v.string(),
      v.transform((x) => +x),
      v.number("Please enter a valid number"),
      v.minValue(0, "amount must be greater than 0"),
      v.transform((x) => x.toString())
    );
  });

export const tip_formats = ["10", "15", "20", "custom", "none"] as const;
export const tip_format = v.picklist(tip_formats);
export type TTipFormat = (typeof tip_formats)[number];

export const donation_fv = v.object({
  tip: amount(),
  tip_format,
  cover_processing_fee: v.boolean(),
  first_name: v.pipe(str, v.nonEmpty("Please enter your first name")),
  last_name: v.pipe(str, v.nonEmpty("Please enter your last name")),
  email: v.pipe(
    str,
    v.nonEmpty("Please enter your email"),
    v.email("Please check your email for correctness")
  ),
});

export interface IDonationFvBase extends v.InferOutput<typeof donation_fv> {}

export const fiat_donation_details = v.object({
  amount: amount({ required: true }),
  currency: currency_fv,
});

export interface FiatDonationDetails
  extends v.InferOutput<typeof fiat_donation_details> {}

export const stripe_donation_details = v.pipe(
  v.object({
    frequency,
    ...fiat_donation_details.entries,
    ...donation_fv.entries,
  }),
  v.forward(
    v.partialCheck(
      [["amount"], ["currency"]],
      ({ amount, currency }) => {
        if (!currency.min) return true;
        return +amount >= currency.min;
      },
      "less than min"
    ),
    ["amount"]
  ),
  v.forward(
    v.partialCheck(
      [["tip"], ["tip_format"]],
      ({ tip, tip_format }) => {
        if (tip_format !== "custom") return true;
        return +tip > 0;
      },
      "required"
    ),
    ["tip"]
  )
);

export interface StripeDonationDetails
  extends v.InferOutput<typeof stripe_donation_details> {
  method: Extract<DonateMethodId, "stripe">;
}

export type StocksDonationDetails = {
  method: Extract<DonateMethodId, "stocks">;
  symbol: string;
  num_shares: string;
};

export const daf_donation_details = v.pipe(
  fiat_donation_details,
  v.forward(
    v.partialCheck(
      [["amount"], ["currency"]],
      ({ amount, currency }) => {
        if (!currency.min) return true;
        return +amount >= currency.min;
      },
      "less than min"
    ),
    ["amount"]
  )
);

export interface DafDonationDetails
  extends v.InferOutput<typeof daf_donation_details> {
  method: Extract<DonateMethodId, "daf">;
}

export type DonationDetails =
  | StripeDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export type Mode = "live" | "preview";

export type Config = {
  /** donation tabs follows the list order */
  method_ids?: DonateMethodId[];
  /** hex color without alpha */
  accent_primary?: string;
  /** hex color without alpha */
  accent_secondary?: string;
  increments?: IIncrement[];
};

export interface IProgram {
  id: string;
  name: string;
}

export type Init = {
  source: DonationSource;
  mode: Mode;
  recipient: DonationRecipient;
  program?: IProgram;
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

export type SummaryStep = {
  step: "summary";
  donor?: Donor;
  tribute?: Tribute;
  fee_allowance?: number;
} & From<TipStep, "tip">;

export type FinishedSummaryData = Required<
  Pick<SummaryStep, "donor" | "fee_allowance">
> & { tribute?: Tribute };

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<From<SummaryStep, "tip" | "tribute">, "details"> & { details: T };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type DafCheckoutStep = SubmitStep<DafDonationDetails>;

export type DonationState = FormStep | TipStep | SummaryStep | SubmitStep;
