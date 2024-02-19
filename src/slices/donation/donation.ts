import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CryptoResultStep,
  DonationDetails,
  DonationRecipient,
  DonationState,
  DonationStep,
  FormStep,
  KYC,
  KYCStep,
  SplitsStep,
  SubmitStep,
  TipFormat,
  TipStep,
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
      //when changing donation method, reset
      const curr: DonationState =
        state.step === "donate-form" && state.details?.method !== payload.method
          ? { step: "donate-form", recipient: state.recipient }
          : state;

      //skip KYC for stocks, as not being saved in DB
      if (payload.method === "stocks") {
        return {
          ...(curr as SubmitStep),
          step: "submit",
          details: payload,
        };
      }

      if (state.recipient?.isKYCRequired || payload.userOptForKYC) {
        return {
          ...(curr as KYCStep),
          step: "kyc-form",
          details: payload,
        };
      }
      return {
        ...(curr as SplitsStep),
        step: "splits",
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
        ...(state as SplitsStep),
        step: "splits",
        kyc: payload,
      };
    },
    setSplit: (state, { payload }: PayloadAction<number>) => {
      return {
        ...(state as TipStep),
        step: "tip",
        liquidSplitPct: payload,
      };
    },
    setTip: (
      state,
      { payload }: PayloadAction<{ tip: number; format: TipFormat }>
    ) => {
      return {
        ...(state as SubmitStep),
        step: "submit",
        tip: payload.tip,
        format: payload.format,
      };
    },

    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as CryptoResultStep),
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
  setSplit,
  setTip,
  setTxStatus,
} = donation.actions;
