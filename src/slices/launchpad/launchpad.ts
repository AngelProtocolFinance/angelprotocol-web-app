import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Completed, Init, LaunchState, Steps } from "./types";
import { useSetter } from "store/accessors";

const initialState: Init = {};

const launchpad = createSlice({
  name: "gift",
  initialState: initialState as LaunchState,
  reducers: {
    update: (
      state: any,
      { payload }: PayloadAction<{ step: Steps; payload: Completed[Steps] }>
    ) => {
      state[payload.step] = payload.payload;
    },
  },
});
const { update: updateAction } = launchpad.actions;

export default launchpad.reducer;

export function useUpdate<T extends Steps>(step: T) {
  const dispatch = useSetter();
  return (payload: Completed[T]) => dispatch(updateAction({ step, payload }));
}
