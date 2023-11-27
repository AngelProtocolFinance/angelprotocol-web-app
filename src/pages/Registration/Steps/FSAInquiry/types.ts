import { OverrideProperties } from "type-fest";
import { FSAInquiry } from "types/aws";

export type FV = OverrideProperties<
  FSAInquiry,
  { AuthorizedToReceiveTaxDeductibleDonations: "Yes" | "No" }
>;
