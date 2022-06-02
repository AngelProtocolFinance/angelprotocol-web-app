import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chainIDs } from "constants/chainIDs";
import { chains, State } from "./types";

const initialState: State = {
  [chains.terra]: chainIDs.terra_main,
  [chains.ethereum]: chainIDs.eth_main,
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
