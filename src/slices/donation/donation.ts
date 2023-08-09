import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DonationDetails,
  DonationRecipient,
  DonationState,
  DonationStep,
  FormStep,
  KYC,
  KYCStep,
  SubmitStep,
  TxStatus,
} from "./types";

const initialState: DonationState = { step: "init" };

const donation = createSlice({
  name: "donate",
  initialState: initialState as DonationState,
  reducers: {
    setRecipient: (_, { payload }: PayloadAction<DonationRecipient>) => {
      return { step: "donate-form", recipient: payload };
    },
    setDetails: (state, { payload }: PayloadAction<DonationDetails>) => {
      return {
        ...(state as KYCStep),
        step: "kyc-form",
        details: payload,
      };
    },
    resetDetails: (state) => {
      return {
        ...(state as FormStep),
        step: "donate-form",
        details: undefined,
      };
    },
    setKYC: (state, { payload }: PayloadAction<KYC>) => {
      return {
        ...(state as SubmitStep),
        step: "submit",
        kyc: payload,
      };
    },

    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as SubmitStep),
        step: "tx",
        status: payload,
      };
    },

    setStep(state, { payload }: PayloadAction<DonationStep>) {
      state.step = payload;
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
