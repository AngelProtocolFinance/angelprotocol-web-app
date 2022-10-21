import {
  PayloadAction,
  createListenerMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import { EndowmentsSortKey } from "types/aws";
import { CapitalizedEndowmentType } from "types/contracts";

export type Sort = { key: EndowmentsSortKey; isAscending: boolean };

type State = {
  isOpen: boolean;
  searchText: string;
  types: CapitalizedEndowmentType[];
  sort?: Sort;

  //geography
  sdgs: { [idx: number]: number[] };
  key?: string;
};
const initialState: State = {
  sdgs: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  isOpen: false,
  searchText: "",
  types: [],
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
      }: PayloadAction<{ group: number; sdgs: number[] }>
    ) => {
      // state.key = undefined;
      // state.sdgs[group] = sdgs; //TODO: enable multiple sdgs

      //set only single sdg
      const _sdgs = { ...initialState.sdgs, [group]: [sdgs[sdgs.length - 1]] };
      return { ...state, sdgs: _sdgs, key: undefined };
    },
    setKey: (state, { payload }: PayloadAction<string | undefined>) => {
      state.key = payload;
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.key = undefined;
      state.sort = payload;
    },
    setTypes: (
      state,
      { payload }: PayloadAction<CapitalizedEndowmentType[]>
    ) => {
      // state.types = payload; //TODO: enable multiple types
      //set only single type

      state.key = undefined;
      state.types = [payload[payload.length - 1]];
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSdgs, reset, toggle, setTypes, setKey, setSort } =
  marketFilter.actions;

export default marketFilter.reducer;
