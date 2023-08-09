import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProposalGroupOptions, ProposalStatusOptions } from "./types";

interface State {
  activeStatus: ProposalStatusOptions;
  activeGroup: ProposalGroupOptions;
}

const initialState: State = {
  activeStatus: "all",
  activeGroup: "all",
};

const proposalsSlice = createSlice({
  name: "component/proposals",
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

export default proposalsSlice.reducer;
export const { changeSelectedStatus, changeSelectedGroup } =
  proposalsSlice.actions;
