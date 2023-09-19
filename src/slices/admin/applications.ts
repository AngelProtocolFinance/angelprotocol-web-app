import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApplicationStatusOptions } from "./types";

interface State {
  activeStatus: ApplicationStatusOptions;
}

const initialState: State = {
  activeStatus: "under-review",
};

const proposalsSlice = createSlice({
  name: "component/applications",
  initialState,
  reducers: {
    changeSelectedStatus: (
      state,
      { payload }: PayloadAction<ApplicationStatusOptions>
    ) => {
      state.activeStatus = payload;
    },
  },
});

export default proposalsSlice.reducer;
export const { changeSelectedStatus } = proposalsSlice.actions;
