import type { Endow } from "@better-giving/endowment";
import type { FundItem } from "@better-giving/fundraiser";

export interface LoaderData {
  funds: FundItem[];
  endow: Endow;
}
