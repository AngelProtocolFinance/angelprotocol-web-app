import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  isOpen: boolean;
  searchText: string;
  //type: "profit" | "non-profit"
  //geography
  sdgs: number[];
};
const initialState: State = { sdgs: [], isOpen: false, searchText: "" };

const marketFilter = createSlice({
  name: "marketFilter",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setSdgs: (state, { payload }: PayloadAction<number[]>) => {
      state.sdgs = payload;
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSdgs, reset, toggle } = marketFilter.actions;
export default marketFilter.reducer;
