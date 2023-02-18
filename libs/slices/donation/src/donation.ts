import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DonationDetails,
  DonationRecipient,
  DonationState,
  FormStep,
  KYCStep,
  SkippableKYC,
  SubmitStep,
  TxStatus,
} from "./types";

const initialState: DonationState = { step: 0 };

const donation = createSlice({
  name: "donate",
  initialState: initialState as DonationState,
  reducers: {
    setRecipient: (_, { payload }: PayloadAction<DonationRecipient>) => {
      return { step: 1, recipient: payload };
    },
    setDetails: (state, { payload }: PayloadAction<DonationDetails>) => {
      return {
        ...(state as KYCStep),
        step: 2,
        details: payload,
      };
    },
    resetDetails: (state) => {
      return {
        ...(state as FormStep),
        step: 1,
        details: undefined,
      };
    },
    setKYC: (state, { payload }: PayloadAction<SkippableKYC>) => {
      return {
        ...(state as SubmitStep),
        step: 3,
        kyc: payload,
      };
    },

    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as SubmitStep),
        step: 4,
        status: payload,
      };
    },

    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload as DonationState["step"];
    },
  },
});

export default donation.reducer;
export const {
  setRecipient,
  setStep,
  setDetails,
  resetDetails,
  setKYC,
  setTxStatus,
} = donation.actions;
