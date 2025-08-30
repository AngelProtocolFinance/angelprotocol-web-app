import type { INpoDb } from "@better-giving/endowment";

export type EndowContentFromReg = Pick<
  INpoDb,
  | "active_in_countries"
  | "endow_designation"
  | "fiscal_sponsored"
  | "hq_country"
  | "kyc_donors_only"
  | "name"
  | "registration_number"
  | "url"
  | "claimed"
  | "referrer"
  | "referrer_expiry"
  | "referral_id"
>;
