import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PendingTx, State, Wallets } from "./types";

const initialState: State = {
  activeWallet: Wallets.none,
  isLoading: false,
  pending_tx: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<Wallets>) => {
      state.activeWallet = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setPending: (state, { payload }: PayloadAction<PendingTx>) => {
      state.pending_tx = payload;
    },
  },
});

export default walletSlice.reducer;
export const { setActive, setLoading, setPending } = walletSlice.actions;
