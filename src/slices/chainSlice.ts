import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChainIDs, Chains } from "@types-lists";

type State = {
  [key in Chains]: ChainIDs;
};

const initialState: State = {
  terra: "columbus-5",
  ethereum: "1",
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    updateChainID: (
      state,
      { payload }: PayloadAction<{ chain: Chains; chainID: ChainIDs }>
    ) => {
      state[payload.chain] = payload.chainID;
    },
  },
});

export default chainSlice.reducer;
export const { updateChainID } = chainSlice.actions;
