import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EndowDesignation } from "types/aws";
import { SDGGroup } from "types/lists";
import { initialState } from "./constants";
import { Sort } from "./types";

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setSDGgroups: (state, { payload }: PayloadAction<SDGGroup[]>) => {
      state.sdgGroups = payload;
    },
    setCountries: (state, { payload }: PayloadAction<string[]>) => {
      state.countries = payload;
    },
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
    setKYCOnly: (state, { payload }: PayloadAction<boolean[]>) => {
      state.kyc_only = payload;
    },
    setVerified: (state, { payload }: PayloadAction<boolean[]>) => {
      state.verified = payload;
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.sort = payload;
    },
    setDesignations: (
      state,
      { payload }: PayloadAction<EndowDesignation[]>
    ) => {
      state.endow_designation = payload;
    },
  },
});

export const {
  setSDGgroups,
  reset,
  setDesignations,
  setCountries,
  setSort,
  setKYCOnly,
  setSearchText,
  setVerified,
} = marketFilter.actions;

export default marketFilter.reducer;
