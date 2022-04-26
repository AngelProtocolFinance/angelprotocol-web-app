import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChainIDs } from "@types-lists";
import { chains } from "constants/chains";

type State = {
  [key in chains]: ChainIDs;
};

const initialState: State = {
  [chains.terra]: "columbus-5",
  [chains.ethereum]: "1",
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    updateChainID: (
      state,
      { payload }: PayloadAction<{ chain: chains; chainID: ChainIDs }>
    ) => {
      state[payload.chain] = payload.chainID;
    },
  },
});

export default chainSlice.reducer;
export const { updateChainID } = chainSlice.actions;
