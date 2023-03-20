import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Completed, LaunchState, Network, Progress, Steps } from "./types";
import { useGetter, useSetter } from "store/accessors";

export const LAUNCHPAD_STORAGE_KEY = "ap__launchpad";

const saved = window.localStorage.getItem(LAUNCHPAD_STORAGE_KEY);

const init: LaunchState | null = saved && JSON.parse(saved);

const initialState = init || { progress: 1, network: "polygon" };

const launchpad = createSlice({
  name: "launchpad",
  initialState: initialState as LaunchState,
  reducers: {
    update: (
      state,
      { payload }: PayloadAction<{ step: Steps; payload: Completed[Steps] }>
    ) => {
      //if completed, don't update
      if (state.progress < 7) {
        state.progress = (payload.step + 1) as Progress;
      }

      (state as any)[payload.step] = payload.payload;

      window.localStorage.setItem(LAUNCHPAD_STORAGE_KEY, JSON.stringify(state));
    },
    reset: (state, { payload }: PayloadAction<Network>) => {
      window.localStorage.removeItem(LAUNCHPAD_STORAGE_KEY);

      //save init - as it constants previously selected network
      const init: LaunchState = { progress: 1, network: payload };
      window.localStorage.setItem(LAUNCHPAD_STORAGE_KEY, JSON.stringify(init));
      return { progress: 1, network: payload };
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
    reset(network: Network) {
      dispatch(launchpad.actions.reset(network));
    },
  };
}
