import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  //type: "profit" | "non-profit"
  //geography
  sdgs: number[];
};
const initialState: State = { sdgs: [] };

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
  },
});

export const { setSdgs, reset } = marketFilter.actions;
export default marketFilter.reducer;
