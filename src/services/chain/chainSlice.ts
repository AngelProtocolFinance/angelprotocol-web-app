import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chainIDs } from "contracts/types";
import { chains, State } from "./types";

const initialState: State = {
  [chains.terra]: chainIDs.mainnet,
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    updateChainID: (
      state,
      { payload }: PayloadAction<{ chain: chains; chainID: string }>
    ) => {
      state[payload.chain] = payload.chainID;
    },
  },
});

export default chainSlice.reducer;
export const { updateChainID } = chainSlice.actions;
