import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EndowmentsSortKey, SortDirection } from "types/aws";
import { CapitalizedEndowmentType } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";

export type Sort = { key: EndowmentsSortKey; direction: SortDirection };

type State = {
  isOpen: boolean;
  searchText: string;
  types: CapitalizedEndowmentType[];
  sort?: Sort;
  //geography
  sdgs: { [idx: number]: UNSDG_NUMS[] };
  kycOnly: boolean;
};
const initialState: State = {
  sdgs: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  isOpen: false,
  searchText: "",
  types: ["Charity"],
  kycOnly: false,
};

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
      state.sdgs[group] = sdgs;
    },
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
    setKYCOnly: (state, { payload }: PayloadAction<boolean>) => {
      state.kycOnly = payload;
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.sort = payload;
    },
    setTypes: (
      state,
      { payload }: PayloadAction<CapitalizedEndowmentType[]>
    ) => {
      // state.types = payload; //TODO: enable multiple types
      //set only single type
      state.types = [payload[payload.length - 1]];
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
