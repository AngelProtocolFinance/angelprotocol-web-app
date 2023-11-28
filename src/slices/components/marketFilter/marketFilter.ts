import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegionType, Sort } from "./types";
import { EndowDesignation } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { initialState } from "./constants";

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    reset: (state) => {
      //reset everything except isOpen && sortKey
      return { ...initialState, isOpen: state.isOpen, sortKey: state.sort };
    },
    setSdgs: (state, { payload }: PayloadAction<UNSDG_NUMS[]>) => {
      state.sdgs = payload;
    },
    setRegions: (
      state,
      {
        payload: { type, value },
      }: PayloadAction<{
        type: RegionType;
        value: { region: string; countries: string[] };
      }>
    ) => {
      state.region[type][value.region] = value.countries;
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
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setSdgs,
  setRegions,
  reset,
  toggle,
  setDesignations,
  setSort,
  setKYCOnly,
  setSearchText,
} = marketFilter.actions;

export default marketFilter.reducer;
