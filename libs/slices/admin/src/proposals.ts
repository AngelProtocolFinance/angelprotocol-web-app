import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProposalGroupOptions, ProposalStatusOptions } from "./types";

const initialState: {
  activeStatus: ProposalStatusOptions;
  activeGroup: ProposalGroupOptions;
} = {
  activeStatus: "all",
  activeGroup: "all",
};

const proposals = createSlice({
  name: "proposals",
  initialState,
  reducers: {
    changeSelectedStatus: (
      state,
      { payload }: PayloadAction<ProposalStatusOptions>
    ) => {
      state.activeStatus = payload;
    },

    changeSelectedGroup: (
      state,
      { payload }: PayloadAction<ProposalGroupOptions>
    ) => {
      state.activeGroup = payload;
    },
  },
});

export default proposals.reducer;
export const { actions } = proposals;
