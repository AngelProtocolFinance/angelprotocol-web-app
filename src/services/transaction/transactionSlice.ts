import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { denoms } from "constants/currency";
import { FormError, Stage, State, Step } from "./types";

const initialState: State = {
  form_loading: false,
  form_error: null,
  fee: 0,
  stage: { step: Step.form },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFormError: (state, { payload }: PayloadAction<FormError | null>) => {
      if (!payload) {
        state.form_error = payload;
      } else if (typeof payload === "string") {
        state.form_error = { title: payload };
      } else {
        state.form_error = { title: payload.title, details: payload.details };
      }
      state.form_loading = false;
    },
    setFormLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.form_loading = payload;
    },
    setFee: (
      state,
      { payload }: PayloadAction<{ fee: number; denom?: denoms }>
    ) => {
      state.fee = payload.fee;
      state.feeDenom = payload.denom;
    },
    resetFee: (state) => {
      state.fee = 0;
      state.feeDenom = undefined;
    },
    setStage: (state, { payload }: PayloadAction<Stage>) => {
      state.stage = payload;
    },
    resetTxFormState: (state) => {
      state.fee = 0;
      state.feeDenom = undefined;
      state.form_error = "";
      state.form_loading = false;
    },
  },
});

export default transactionSlice.reducer;
export const {
  setFormError,
  setFormLoading,
  resetFee,
  setFee,
  setStage,
  resetTxFormState,
} = transactionSlice.actions;
