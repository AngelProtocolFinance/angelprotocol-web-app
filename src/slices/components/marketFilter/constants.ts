import { FilterState } from "./types";

export const initialState: FilterState = {
  sdgs: [],
  countries: [],
  isOpen: false,
  searchText: "",
  endow_types: [],
  endow_designation: [],
  kyc_only: [],
  tiers: [2, 3],
};
