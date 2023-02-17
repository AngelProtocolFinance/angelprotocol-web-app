import { UNSDG_NUMS } from "@ap/types";
import {
  EndowDesignation,
  EndowmentsSortKey,
  SortDirection,
} from "@ap/types/aws";
import { CapitalizedEndowmentType, EndowmentTier } from "@ap/types/contracts";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };
export type SdgGroups = { [group: number]: UNSDG_NUMS[] };
export type Regions = {
  [region: string]: string[] | undefined /** countries */;
};

export type FilterState = {
  isOpen: boolean;
  searchText: string;
  endow_types: CapitalizedEndowmentType[];
  endow_designation: EndowDesignation[];
  sort?: Sort;
  sdgGroups: SdgGroups;
  region: { activities: Regions; headquarters: Regions };
  kyc_only: boolean[];
  tiers: Exclude<EndowmentTier, "Level1">[];
};

export type RegionType = keyof FilterState["region"];
