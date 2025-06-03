import type { Endow } from "@better-giving/endowment/db";

export type EndowContentFromReg = Pick<
  Endow.DbRecord,
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
  | "gsi1PK"
  | "gsi1SK"
  | "gsi2PK"
  | "gsi2SK"
  | "referral_id"
>;
