import type { OverrideProperties } from "type-fest";
import type { FSAInquiry } from "types/aws";

export type FV = OverrideProperties<
  FSAInquiry,
  { AuthorizedToReceiveTaxDeductibleDonations: "Yes" | "No" }
>;
