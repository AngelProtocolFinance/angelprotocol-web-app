import { OverrideProperties } from "type-fest";
import { DecodedApplicationProposal } from "types/typechain-types/custom";
import { TransactionStatus } from "../lists";

export type NewTransaction = {
  destination: string;
  value: string;
  data: string;
  meta: string;
};

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};

export type ApplicationProposal = OverrideProperties<
  Pick<DecodedApplicationProposal, "executed" | "expiry">,
  { expiry: number }
>;
