import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Providers = "none" | "ethereum" | "binance" | "terra";
export type ProviderStates = Array<[Providers, boolean]>;
export interface Dwindow extends Window {
  xfi?: {
    ethereum?: any;
  };
  ethereum?: any;
  BinanceChain?: any;
}

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
