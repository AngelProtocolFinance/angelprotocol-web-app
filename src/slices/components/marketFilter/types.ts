import { EndowmentsSortKey, SortDirection } from "types/aws";
import { CapitalizedEndowmentType, EndowmentTier } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };
export type SdgGroups = { [idx: number]: UNSDG_NUMS[] };

export type FilterState = {
  isOpen: boolean;
  searchText: string;
  endow_types: CapitalizedEndowmentType[];
  sort?: Sort;
  //geography
  sdgGroups: SdgGroups;
  kyc_only: boolean[];
  tiers: Exclude<EndowmentTier, "Level1">[];
};
