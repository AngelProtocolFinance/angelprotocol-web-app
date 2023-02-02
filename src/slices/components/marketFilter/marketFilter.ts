import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RegionType, Sort } from "./types";
import { EndowDesignation } from "types/aws";
import { CapitalizedEndowmentType } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { clearedState, initialState } from "./constants";

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    clear: (state) => {
      // clears everything except isOpen && sortKey
      return { ...clearedState, isOpen: state.isOpen, sortKey: state.sort };
    },
    reset: (state) => {
      //reset everything except isOpen && sortKey
      return { ...initialState, isOpen: state.isOpen, sortKey: state.sort };
    },
    setSdgs: (
      state,
      {
        payload: { group, sdgs },
      }: PayloadAction<{ group: number; sdgs: UNSDG_NUMS[] }>
    ) => {
      state.sdgGroups[group] = sdgs;
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
    setTypes: (
      state,
      { payload }: PayloadAction<CapitalizedEndowmentType[]>
    ) => {
      state.endow_types = payload;
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
  clear,
  reset,
  toggle,
  setTypes,
  setDesignations,
  setSort,
  setKYCOnly,
  setSearchText,
} = marketFilter.actions;

export default marketFilter.reducer;
