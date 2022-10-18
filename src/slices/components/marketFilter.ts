import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CapitalizedEndowmentType } from "types/contracts";

type State = {
  isOpen: boolean;
  searchText: string;
  types: CapitalizedEndowmentType[];
  //type: "profit" | "non-profit"
  //geography
  sdgs: { [idx: number]: number[] };
  key?: string; //update with LastEvaluatedKey from AWSQueryRes to get next page
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
      //reset everything except isOpen
      return { ...initialState, isOpen: state.isOpen };
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
    setKey: (state, { payload }: PayloadAction<string>) => {
      state.key = payload;
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

export const { setSdgs, reset, toggle, setTypes, setKey } =
  marketFilter.actions;
export default marketFilter.reducer;
