import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FormStep,
  GiftDetails,
  GiftState,
  SubmitStep,
  TxStatus,
} from "./types";

const initialState: GiftState = { step: 1 };

const gift = createSlice({
  name: "gift",
  initialState: initialState as GiftState,
  reducers: {
    setDetails: (state, { payload }: PayloadAction<GiftDetails>) => {
      return {
        ...(state as SubmitStep),
        step: 2,
        details: payload,
      };
    },
    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as SubmitStep),
        step: 3,
        status: payload,
      };
    },
    resetDetails: (state) => {
      return {
        ...(state as FormStep),
        step: 1,
        details: undefined,
      };
    },

    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload as GiftState["step"];
    },
  },
});

export default gift.reducer;
export const { setStep, setDetails, resetDetails, setTxStatus } = gift.actions;
