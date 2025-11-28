import type { DonateMethodId } from "@better-giving/endowment";
import { $int_gte1, type IIncrement } from "@better-giving/schemas";
import { type ICurrencyFv, currency_fv } from "types/currency";
import { type Donor, frequency } from "types/donation-intent";
export {
  type Tribute,
  type TFrequency,
  type Donor,
  tribute,
  donor,
} from "types/donation-intent";
import type { DonationSource } from "types/lists";
import * as v from "valibot";

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
  donor_address_required: v.union([v.boolean(), v.undefined()]),
});

export const is_fund = (recipient: string) => v.UUID_REGEX.test(recipient); //is uuid

export interface DonationRecipient
  extends v.InferOutput<typeof donation_recipient> {}

export const donation_recipient_init = (
  overrides?: Partial<DonationRecipient>
): DonationRecipient => {
  return {
    id: "1",
    name: "Better Giving",
    members: [],
    donor_address_required: false,
    ...overrides,
  };
};

export const program_opt = v.object({
  label: v.string(),
  value: v.string(),
});

export interface ProgramOption extends v.InferOutput<typeof program_opt> {}

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

export const ticker_raw = v.object({
  symbol: v.pipe(v.string(), v.nonEmpty("select ticker")),
  amount: amount({ required: true }),

  // internal
  rate: v.number(),
  min: v.number(),
  name: v.string(),
});

export const ticker_fv = v.pipe(
  ticker_raw,
  v.forward(
    v.partialCheck(
      [["amount"], ["min"]],
      ({ amount, min }) => {
        if (!min) return true;
        return +amount >= min;
      },
      "less than minimum"
    ),
    ["amount"]
  )
);

export interface ITickerFv extends v.InferOutput<typeof ticker_fv> {}

const token_raw = v.object({
  id: v.pipe(v.string(), v.nonEmpty("select token")),
  amount: amount({ required: true }),

  // internal
  name: v.string(),
  code: v.string(),
  min: v.number(),
  /**  usd/unit */
  rate: v.number(),
  logo: v.string(),
  precision: v.number(),
  network: v.string(),
  cg_id: v.string(),
  color: v.string(),
  symbol: v.string(),
});

export interface ITokenFv extends v.InferOutput<typeof token_raw> {}

export const token_fv = v.pipe(
  token_raw,
  v.forward(
    v.partialCheck(
      [["amount"], ["min"]],
      ({ amount, min }) => {
        if (!min) return true;
        return +amount >= min;
      },
      "less than minimum"
    ),
    ["amount"]
  ),
  v.forward(
    v.partialCheck(
      [["amount"], ["precision"]],
      ({ amount, precision }) => {
        if (!amount) return true;
        const num_decimals = amount.toString().split(".").at(1)?.length ?? 0;
        return num_decimals <= precision;
      },
      (x) => `can't be more than ${x.input.precision} decimals`
    ),
    ["amount"]
  )
);

export const tip_formats = ["10", "15", "20", "custom", "none"] as const;
export const tip_format = v.picklist(tip_formats);

export type TTipFormat = (typeof tip_formats)[number];

const tip_fv = v.object({
  tip: amount(),
  tip_format,
});

type TipFv = v.InferOutput<typeof tip_fv>;

export const tip_fv_init: TipFv = {
  tip: "",
  tip_format: "15",
};

const is_tip_valid = (input: TipFv) => {
  if (input.tip_format !== "custom") return true;
  return +input.tip > 0;
};

export const tip_val = (
  format: TTipFormat,
  custom: string,
  amount: number
): number => {
  if (format === "custom") {
    return +custom;
  }
  if (format === "none") return 0;
  const pct = +format / 100;
  return pct * amount;
};

export const tip_from_val = (
  value: number,
  base: number
): { tip_format: TTipFormat; tip: string } => {
  const pct = base / value;
  if (Math.abs(pct - 0.15) < 0.001) return { tip_format: "15", tip: "" };
  if (Math.abs(pct - 0.2) < 0.001) return { tip_format: "20", tip: "" };
  if (Math.abs(pct - 0.1) < 0.001) return { tip_format: "10", tip: "" };
  return { tip_format: "custom", tip: value.toString() };
};

const is_min_met = (input: { amount: string; currency: ICurrencyFv }) => {
  if (!input.currency.min) return true;
  return +input.amount >= input.currency.min;
};

const crypto_donation_raw = v.object({
  token: token_fv,
  ...tip_fv.entries,
  cover_processing_fee: v.boolean(),
});

export type CryptoDonationDetails = v.InferOutput<typeof crypto_donation_raw>;
export const crypto_donation_details = v.pipe(
  crypto_donation_raw,
  v.forward(
    v.partialCheck([["tip"], ["tip_format"]], is_tip_valid, "required"),
    ["tip"]
  )
);

const stripe_donation_details_raw = v.object({
  amount: amount({ required: true }),
  currency: currency_fv,
  frequency,
  ...tip_fv.entries,
  cover_processing_fee: v.boolean(),
});

export interface StripeDonationDetails
  extends v.InferOutput<typeof stripe_donation_details_raw> {}

export const stripe_donation_details = v.pipe(
  stripe_donation_details_raw,
  v.forward(
    v.partialCheck([["amount"], ["currency"]], is_min_met, "less than min"),
    ["amount"]
  ),
  v.forward(
    v.partialCheck([["tip"], ["tip_format"]], is_tip_valid, "required"),
    ["tip"]
  )
);

const stocks_donation_details_raw = v.object({
  ticker: ticker_fv,
  ...tip_fv.entries,
});

export type StocksDonationDetails = v.InferOutput<
  typeof stocks_donation_details_raw
>;

export const stocks_donation_details = v.pipe(
  stocks_donation_details_raw,
  v.forward(
    v.partialCheck([["tip"], ["tip_format"]], is_tip_valid, "required"),
    ["tip"]
  )
);

const daf_donation_details_raw = v.object({
  amount: amount({ required: true }),
  ...tip_fv.entries,
  cover_processing_fee: v.boolean(),
});

export interface DafDonationDetails
  extends v.InferOutput<typeof daf_donation_details_raw> {}

export const daf_donation_details = v.pipe(
  daf_donation_details_raw,
  v.forward(
    v.partialCheck([["tip"], ["tip_format"]], is_tip_valid, "required"),
    ["tip"]
  )
);

export type Mode = "live" | "preview";

export type Config = {
  id: string | null;
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

export interface IUser {
  email: string;
  first_name?: string;
  last_name?: string;
}

export type Init = {
  source: DonationSource;
  mode: Mode;
  recipient: DonationRecipient;
  program?: IProgram;
  config: Config | null;
  user?: IUser;
};

export type TMethod = "stripe" | "crypto" | "stocks" | "daf";

type TFV<T extends TMethod> = T extends "stripe"
  ? StripeDonationDetails
  : T extends "crypto"
    ? CryptoDonationDetails
    : T extends "stocks"
      ? StocksDonationDetails
      : T extends "daf"
        ? DafDonationDetails
        : never;

export type TMethodState<T extends TMethod> =
  | { type: T; step: "form"; fv?: TFV<T> }
  /** donor info is set shared among donate methods */
  | { type: T; step: "donor"; fv: TFV<T> }
  | { type: T; step: "checkout"; fv: TFV<T> };

export type TDonation = Init & {
  /** may be empty */
  donor: Donor;
  method: TMethod;
} & {
  [method in TMethod]?: TMethodState<method>;
};

export type StateSetter = (
  new_state: TDonation | ((prev: TDonation) => TDonation)
) => void;

export type State = {
  don: TDonation;
  don_set: StateSetter;
};

export const to_step = <T extends TMethod>(
  type: T,
  curr: TFV<T>,
  step: "form" | "donor" | "checkout",
  setter: StateSetter
) => {
  setter((x) => ({
    ...x,
    method: type,
    [type]: {
      type: type,
      step: step,
      fv: curr,
    },
  }));
};
