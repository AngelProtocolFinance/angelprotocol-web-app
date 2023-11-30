import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sort } from "./types";
import { EndowDesignation } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { initialState } from "./constants";

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setSdgs: (state, { payload }: PayloadAction<UNSDG_NUMS[]>) => {
      state.sdgs = payload;
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
  setSdgs,
  reset,
  setDesignations,
  setCountries,
  setSort,
  setKYCOnly,
  setSearchText,
} = marketFilter.actions;

export default marketFilter.reducer;
