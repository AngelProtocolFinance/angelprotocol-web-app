import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Completed, LaunchState, Progress, Steps } from "./types";
import { useGetter, useSetter } from "store/accessors";

const STORAGE_KEY = "ap__launchpad";

const init: LaunchState | null = window.localStorage.getItem(
  STORAGE_KEY
) as any;

const initialState = init || {};

const launchpad = createSlice({
  name: "launchpad",
  initialState: initialState as LaunchState,
  reducers: {
    update: (
      state,
      { payload }: PayloadAction<{ step: Steps; payload: Completed[Steps] }>
    ) => {
      //after updating, always move to next step
      state.curr = (payload.step + 1) as Progress;

      //update progress
      if (state.curr > state.progress) {
        state.progress = state.curr;
      }

      (state as any)[payload.step] = payload.payload;

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    reset: (state) => {
      window.localStorage.removeItem(STORAGE_KEY);
      return { curr: 0, progress: 0 };
    },
  },
});

export default launchpad.reducer;

export function useLaunchpad<T extends Steps>(step: T) {
  const state = useGetter((state) => state.launchpad);
  const dispatch = useSetter();

  const navigate = useNavigate();

  return {
    update(payload: Completed[T]) {
      dispatch(launchpad.actions.update({ step, payload }));
      if (state.progress === 7) {
        //if completed, always navigate to summary
        navigate(`../${state.progress}`);
      } else {
        //otherwise, navigate to next step
        navigate(`../${step + 1}`);
      }
    },
    reset() {
      dispatch(launchpad.actions.reset());
    },
  };
}
