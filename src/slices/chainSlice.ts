import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { chainIDs } from "types/chainIDs";
import { chains } from "types/chains";

type State = {
  [key in chains]: string;
};

const initialState: State = {
  [chains.terra]: chainIDs.mainnet,
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
