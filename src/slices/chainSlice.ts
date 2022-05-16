import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chains } from "@types-lists";
import { chainIDs } from "constants/chainIDs";

type State = {
  [key in Chains]: string;
};

const initialState: State = {
  terra: chainIDs.terra_main,
  ethereum: chainIDs.eth_main,
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    updateChainID: (
      state,
      { payload }: PayloadAction<{ chain: Chains; chainID: string }>
    ) => {
      state[payload.chain] = payload.chainID;
    },
  },
});

export default chainSlice.reducer;
export const { updateChainID } = chainSlice.actions;
