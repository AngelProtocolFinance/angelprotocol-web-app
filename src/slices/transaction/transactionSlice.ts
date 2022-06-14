import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormError, Stage } from "slices/transaction/types";

interface IState {
  form_loading: boolean;
  form_error: FormError | null;
  fee: number;
  stage: Stage;
}

const initialState: IState = {
  form_loading: false,
  form_error: null,
  fee: 0,
  stage: { step: "initial", kycData: undefined },
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
    setFee: (state, { payload }: PayloadAction<number>) => {
      state.fee = payload;
    },
    resetFee: (state) => {
      state.fee = 0;
    },
    setStage: (state, { payload }: PayloadAction<Stage>) => {
      state.stage = payload;
    },
    resetTxFormState: () => initialState,
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
