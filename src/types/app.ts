import type { SDGGroup } from "./lists";

/** types that is shared between pages */

export type EndowFilterState = {
  sdgGroup?: SDGGroup;
  country?: string;
  /** may be empty */
  searchText: string;
};
