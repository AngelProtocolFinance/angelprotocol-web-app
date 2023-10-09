import { FilterState } from "./types";

export const initialState: FilterState = {
  sdgs: [],
  countries: [],
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
  countries: [],
  isOpen: false,
  searchText: "",
  endow_types: ["charity"],
  endow_designation: ["Charity"],
  kyc_only: [true, false],
  tiers: [2, 3],
  published: true,
};
