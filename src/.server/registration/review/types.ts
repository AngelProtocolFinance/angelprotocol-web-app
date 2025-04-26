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
  | "sdgs"
  | "url"
  | "claimed"
  | "referrer"
>;
