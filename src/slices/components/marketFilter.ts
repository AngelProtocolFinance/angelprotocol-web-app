import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  isOpen: boolean;
  searchText: string;
  //type: "profit" | "non-profit"
  //geography
  sdgs: { [idx: number]: number[] };
};
const initialState: State = {
  sdgs: { 1: [], 2: [], 3: [], 4: [], 5: [] },
  isOpen: false,
  searchText: "",
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
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSdgs, reset, toggle } = marketFilter.actions;
export default marketFilter.reducer;
