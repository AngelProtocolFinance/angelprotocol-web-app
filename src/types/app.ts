import type { SDGGroup } from "./lists";

/** types that is shared between pages */

export type EndowFilterState = {
  sdgGroup?: SDGGroup;
  /** may be empty */
  searchText: string;
};
