import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type EndowType = "np" | "fp" | "ic";

type State = {
  isOpen: boolean;
  searchText: string;
  types: EndowType[];
  //type: "profit" | "non-profit"
  //geography
  sdgs: { [idx: number]: number[] };
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
      state.sdgs[group] = sdgs;
    },
    setTypes: (state, { payload }: PayloadAction<EndowType[]>) => {
      state.types = payload;
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSdgs, reset, toggle, setTypes } = marketFilter.actions;
export default marketFilter.reducer;
