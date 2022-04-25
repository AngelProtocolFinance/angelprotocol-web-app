import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Providers } from "@types-slice/provider";

interface IState {
  active: Providers;
  isSwitching: boolean;
}
const initialState: IState = {
  active: "none",
  isSwitching: false,
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setActiveProvider: (state, { payload }: PayloadAction<Providers>) => {
      state.active = payload;
    },
    setIsSwitching: (state, { payload }: PayloadAction<boolean>) => {
      state.isSwitching = payload;
    },
  },
});

export default providerSlice.reducer;
export const { setActiveProvider, setIsSwitching } = providerSlice.actions;
