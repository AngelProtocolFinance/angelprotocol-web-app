import { FilterState } from "./types";
import { UNSDG_NUMS } from "types/lists";
import { unsdgs } from "constants/unsdgs";

export const initialState: FilterState = {
  sdgs: Object.keys(unsdgs).map(Number) as UNSDG_NUMS[],
  region: { activities: {}, headquarters: {} },
  isOpen: false,
  searchText: "",
  endow_types: ["charity"],
  endow_designation: ["Religious Organization", "Charity"],
  kyc_only: [true, false],
  tiers: [2, 3],
  published: true,
};

export const clearedState: FilterState = {
  sdgs: [],
  region: { activities: {}, headquarters: {} },
  isOpen: false,
  searchText: "",
  endow_types: [],
  endow_designation: [],
  kyc_only: [],
  tiers: [2, 3],
  published: true,
};
