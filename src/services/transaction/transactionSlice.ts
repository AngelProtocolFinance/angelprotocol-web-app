import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, Step, Stage } from "./types";

const initialState: State = {
  form_loading: false,
  form_error: "",
  fee: 0,
  stage: { step: Step.form },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFormError: (state, { payload }: PayloadAction<string>) => {
      state.form_error = payload;
      state.form_loading = false;
    },
    setFormLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.form_loading = payload;
    },
    setFee: (state, { payload }: PayloadAction<number>) => {
      state.fee = payload;
    },
    setStage: (state, { payload }: PayloadAction<Stage>) => {
      state.stage = payload;
    },
  },
});

export default transactionSlice.reducer;
export const { setFormError, setFormLoading, setFee, setStage } =
  transactionSlice.actions;
