import type {
  EndowDesignation,
  EndowmentsSortKey,
  SortDirection,
} from "types/aws";
import type { SDGGroup } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };

export type FilterState = {
  searchText: string;
  endow_designation: EndowDesignation[];
  sort?: Sort;
  sdgGroups: SDGGroup[];
  countries: string[];
  kyc_only: boolean[];
  verified: boolean[];
};
