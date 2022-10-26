import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = { isRendered: boolean };
const initialState: State = { isRendered: false };

const mobileNav = createSlice({
  name: "mobileNav",
  initialState,
  reducers: {
    setIsRendered: (state, { payload }: PayloadAction<boolean>) => {
      state.isRendered = payload;
    },
  },
});

export const { setIsRendered } = mobileNav.actions;
export default mobileNav.reducer;
