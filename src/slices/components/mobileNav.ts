import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = { isMobileNavOpen: boolean };
const initialState: State = { isMobileNavOpen: false };

const mobileNav = createSlice({
  name: "mobileNav",
  initialState,
  reducers: {
    setIsMobileNavOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobileNavOpen = payload;
    },
  },
});

export const { setIsMobileNavOpen } = mobileNav.actions;
export default mobileNav.reducer;
