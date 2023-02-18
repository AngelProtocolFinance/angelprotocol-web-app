import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApplicationStatusOptions } from "./types";

const initialState: {
  activeStatus: ApplicationStatusOptions;
} = {
  activeStatus: "under-review",
};

const applications = createSlice({
  name: "applications",
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

export default applications.reducer;
export const { actions } = applications;
