import { EndowDesignation, EndowmentsSortKey, SortDirection } from "types/aws";
import { UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };

export type FilterState = {
  searchText: string;
  endow_designation: EndowDesignation[];
  sort?: Sort;
  sdgs: UNSDG_NUMS[];
  countries: string[];
  kyc_only: boolean[];
};
