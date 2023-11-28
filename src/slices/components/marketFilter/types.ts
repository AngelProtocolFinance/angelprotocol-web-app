import { EndowDesignation, EndowmentsSortKey, SortDirection } from "types/aws";
import { EndowmentTierNum } from "types/aws";
import { EndowmentType, UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };
type Regions = {
  [region: string]: string[] | undefined /** countries */;
};

export type FilterState = {
  isOpen: boolean;
  searchText: string;
  endow_types: EndowmentType[];
  endow_designation: EndowDesignation[];
  sort?: Sort;
  sdgs: UNSDG_NUMS[];
  region: { activities: Regions; headquarters: Regions };
  kyc_only: boolean[];
  tiers: Exclude<EndowmentTierNum, 1>[];
  published: boolean;
};

export type RegionType = keyof FilterState["region"];
