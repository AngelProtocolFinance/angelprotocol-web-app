import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sort } from "types/aws";
import { CapitalizedEndowmentType } from "types/contracts";
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
    setSdgs: (
      state,
      {
        payload: { group, sdgs },
      }: PayloadAction<{ group: number; sdgs: UNSDG_NUMS[] }>
    ) => {
      state.sdgGroups[group] = sdgs;
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
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setSdgs,
  reset,
  toggle,
  setTypes,
  setSort,
  setKYCOnly,
  setSearchText,
} = marketFilter.actions;

export default marketFilter.reducer;
