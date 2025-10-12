import type { DonateMethodId } from "@better-giving/endowment";
import { $int_gte1, type IIncrement } from "@better-giving/schemas";
import type { ITokenFv } from "types/components";
import { db_currency } from "types/currency";
import { type Donor, type Tribute, frequency } from "types/donation-intent";
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
  progDonationsAllowed: v.optional(v.boolean()),
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

export const amount = v.lazy((x) => {
  if (!x) return v.pipe(v.string(), v.nonEmpty("Please enter an amount"));
  return v.pipe(
    v.string(),
    v.transform((x) => +x),
    v.minValue(0, "amount must be greater than 0"),
    v.transform((x) => x.toString())
  );
});

export const fiat_donation_details = v.object({
  amount,
  currency: db_currency,
});

export interface FiatDonationDetails
  extends v.InferOutput<typeof fiat_donation_details> {}

export const stripe_donation_details = v.pipe(
  v.object({
    frequency,
    ...fiat_donation_details.entries,
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

export type Init = {
  source: DonationSource;
  mode: Mode;
  recipient: DonationRecipient;
  program?: {
    name: string;
    id: string;
  };
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
