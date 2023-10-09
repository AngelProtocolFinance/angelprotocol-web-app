import { EndowDesignation, EndowmentsSortKey, SortDirection } from "types/aws";
import { EndowmentTierNum } from "types/contracts";
import { EndowmentType, UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };

export type FilterState = {
  isOpen: boolean;
  searchText: string;
  endow_types: EndowmentType[];
  endow_designation: EndowDesignation[];
  sort?: Sort;
  sdgs: UNSDG_NUMS[];
  countries: string[];
  kyc_only: boolean[];
  tiers: Exclude<EndowmentTierNum, 1>[];
  published: boolean;
};
