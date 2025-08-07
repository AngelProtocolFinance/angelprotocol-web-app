import { $int_gte1, allocation } from "@better-giving/endowment/schema";
import * as v from "valibot";
// import Joi from "joi";

export const donation_sources = ["bg-marketplace", "bg-widget"] as const;
export const donation_statuses = ["final", "intent", "pending"] as const;
// export type Method = "Bank" | "Card" | "Crypto";
// export type FiatRamp = "STRIPE" | "PAYPAL" | "CHARIOT";
export const donation_methods = ["Bank", "Card", "Crypto"] as const;
export const fiat_ramps = ["STRIPE", "PAYPAL", "CHARIOT"] as const;
export const donation_source = v.picklist(donation_sources);
export const donation_status = v.picklist(donation_statuses);

export const via_ids = [
  "1",
  "137",
  "42161",
  "421614",
  "11155111",
  "56",
  "80002",
  "97",
  "btc-mainnet",
  "btc-testnet",
  "doge-mainnet",
  "doge-testnet",
  "juno-1",
  "phoenix-1",
  "pisco-1",
  "sol-mainnet",
  "sol-testnet",
  "xrp-mainnet",
  "xrp-testnet",
  "fiat",
];

export const via_id = v.picklist(via_ids);

const email = v.pipe(v.string(), v.email());
const date = v.pipe(v.string(), v.isoTimestamp());

export const donations_query_params = v.pipe(
  v.object({
    asker: v.union([email, $int_gte1]),
    status: v.optional(donation_status),
    page: v.optional($int_gte1),
    limit: v.optional($int_gte1),
    symbol: v.optional(v.pipe(v.string(), v.minLength(3))),
    recipient_name: v.optional(v.string()),
    via_id: v.optional(via_id),
    start_date: v.optional(date),
    end_date: v.optional(date),
  }),
  v.forward(
    v.partialCheck(
      [["start_date"], ["end_date"]],
      ({ end_date: e, start_date: s }) => (s && e ? e >= s : true),
      "start date must be before end date"
    ),
    ["start_date"]
  )
);

const req_str = v.pipe(v.string(), v.nonEmpty("required"));
export const donor_address = v.object({
  line1: req_str,
  line2: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  zip_code: v.optional(v.string()),
  country: req_str,
});

export const donor = v.object({
  full_name: req_str,
  company: v.optional(v.string()),
  kyc_email: v.optional(email),
  address: v.fallback(v.optional(donor_address), undefined),
});

const int = v.pipe(v.number(), v.integer());
const endow_id = v.pipe(int, v.minValue(0));

const amount_num = v.pipe(v.number(), v.minValue(0));
const amount_str = v.pipe(
  v.string(),
  v.transform((x) => +x),
  amount_num
);
const uuid = v.pipe(v.string(), v.uuid());
const amount = v.union([amount_num, amount_str]);
export const pct = v.pipe(amount, v.maxValue(100));
export const donation_item = v.object({
  id: req_str,
  donor_id: req_str,
  donor_details: v.fallback(v.optional(donor), undefined),
  recipient_id: endow_id,
  recipient_name: req_str,
  program_id: v.fallback(v.optional(v.pipe(v.string(), v.uuid())), undefined),
  program_name: v.fallback(v.optional(v.string()), undefined),
  date: date,
  payment_method: v.fallback(v.optional(v.string()), undefined),
  symbol: v.pipe(v.string(), v.minLength(3)),
  init_amount: amount,
  init_amount_usd: v.optional(amount),
  final_amount_usd: v.optional(amount),
  direct_donate_amount: v.optional(amount),
  sf_donate_amount: v.optional(amount),
  split_liq_pct: v.fallback(pct, 50),
  is_recurring: v.optional(v.boolean()),
  app_used: v.fallback(donation_source, "bg-marketplace"),
  bank_verification_url: v.optional(v.pipe(v.string(), v.url())),
  via_id: v.fallback(via_id, "staging"),
  via_name: v.optional(v.string(), "Unknown"),
  payment_id: v.optional(v.union([int, uuid])),
  allocation: v.optional(allocation),
});

export namespace Donation {
  export type Status = v.InferOutput<typeof donation_status>;
  export type Source = v.InferOutput<typeof donation_source>;
  export interface Donor extends v.InferOutput<typeof donor> {}
  export type FiatRamp = (typeof fiat_ramps)[number];
  export type Method = (typeof donation_methods)[number];
  export namespace Donor {
    export interface Address extends v.InferOutput<typeof donor_address> {}
  }
  export interface KYC
    extends Required<Omit<Donor, "address"> & Donor.Address> {}
  export type Item = v.InferOutput<typeof donation_item>;
  export type ItemInput = v.InferInput<typeof donation_item>;
}

export interface DonationsQueryParams
  extends v.InferInput<typeof donations_query_params> {}
export interface DonationsQueryParamsParsed
  extends v.InferOutput<typeof donations_query_params> {}
export type DonationsPage = { items: Donation.Item[]; next_page?: number };
