import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
// import Joi from "joi";

export const donationSources = ["bg-marketplace", "bg-widget"] as const;
export const donationStatuses = ["final", "intent", "pending"] as const;
// export type Method = "Bank" | "Card" | "Crypto";
// export type FiatRamp = "STRIPE" | "PAYPAL" | "CHARIOT";
export const donationMethods = ["Bank", "Card", "Crypto"] as const;
export const fiatRamps = ["STRIPE", "PAYPAL", "CHARIOT"] as const;
export const donationSource = v.picklist(donationSources);
export const donationStatus = v.picklist(donationStatuses);

export const viaIds = [
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

export const viaId = v.picklist(viaIds);

const email = v.pipe(v.string(), v.email());
const date = v.pipe(
  v.string(),
  v.isoTimestamp(),
  v.maxValue(new Date().toISOString())
);

export const donationsQueryParams = v.pipe(
  v.object({
    asker: v.union([email, plusInt]),
    status: v.optional(donationStatus),
    page: v.optional(plusInt),
    limit: v.optional(plusInt),
    symbol: v.optional(v.pipe(v.string(), v.minLength(3))),
    recipientName: v.optional(v.string()),
    viaId: v.optional(viaId),
    startDate: v.optional(date),
    endDate: v.optional(date),
  }),
  v.forward(
    v.partialCheck(
      [["startDate"], ["endDate"]],
      ({ endDate: e, startDate: s }) => (s && e ? e >= s : true),
      "start date must be before end date"
    ),
    ["startDate"]
  )
);

const reqStr = v.pipe(v.string(), v.nonEmpty("required"));
export const donorAddress = v.object({
  line1: reqStr,
  line2: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  zipCode: v.optional(v.string()),
  country: reqStr,
});

export const donor = v.object({
  fullName: reqStr,
  kycEmail: v.optional(email),
  address: v.fallback(v.optional(donorAddress), undefined),
});

const int = v.pipe(v.number(), v.integer());
const endowId = v.pipe(int, v.minValue(0));

const amountNum = v.pipe(v.number(), v.minValue(0));
const amountStr = v.pipe(
  v.string(),
  v.transform((x) => +x),
  amountNum
);
const uuid = v.pipe(v.string(), v.uuid());
const amount = v.union([amountNum, amountStr]);
export const pct = v.pipe(amount, v.maxValue(100));
export const donationItem = v.object({
  id: reqStr,
  donorId: reqStr,
  donorDetails: v.fallback(v.optional(donor), undefined),
  recipientId: endowId,
  recipientName: reqStr,
  programId: v.fallback(v.optional(v.pipe(v.string(), v.uuid())), undefined),
  programName: v.fallback(v.optional(v.string()), undefined),
  date: date,
  paymentMethod: v.fallback(v.optional(v.string()), undefined),
  symbol: v.pipe(v.string(), v.minLength(3)),
  initAmount: amount,
  initAmountUsd: v.optional(amount),
  finalAmountUsd: v.optional(amount),
  directDonateAmount: v.optional(amount),
  sfDonateAmount: v.optional(amount),
  splitLiqPct: v.fallback(pct, 50),
  isRecurring: v.optional(v.boolean()),
  appUsed: v.fallback(donationSource, "bg-marketplace"),
  bankVerificationUrl: v.optional(v.pipe(v.string(), v.url())),
  viaId: v.fallback(viaId, "staging"),
  viaName: v.optional(v.string(), "Unknown"),
  payment_id: v.optional(v.union([int, uuid])),
});

export namespace Donation {
  export type Status = v.InferOutput<typeof donationStatus>;
  export type Source = v.InferOutput<typeof donationSource>;
  export interface Donor extends v.InferOutput<typeof donor> {}
  export type FiatRamp = (typeof fiatRamps)[number];
  export type Method = (typeof donationMethods)[number];
  export namespace Donor {
    export interface Address extends v.InferOutput<typeof donorAddress> {}
  }
  export interface KYC
    extends Required<Omit<Donor, "address"> & Donor.Address> {}
  export type Item = v.InferOutput<typeof donationItem>;
  export type ItemInput = v.InferInput<typeof donationItem>;
}

export interface DonationsQueryParams
  extends v.InferInput<typeof donationsQueryParams> {}
export interface DonationsQueryParamsParsed
  extends v.InferOutput<typeof donationsQueryParams> {}
export type DonationsPage = { Items: Donation.Item[]; nextPage?: number };
