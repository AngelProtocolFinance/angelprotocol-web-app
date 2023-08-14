import { OverrideProperties } from "type-fest";
import { DecodedApplicationProposal } from "types/typechain-types/custom";

export type NewTransaction = {
  destination: string;
  value: string;
  data: string;
  meta: string;
};

export type ApplicationProposal = OverrideProperties<
  Pick<DecodedApplicationProposal, "executed" | "expiry">,
  { expiry: number }
>;
