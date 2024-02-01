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
      if (state.recipient?.isKYCRequired || payload.userOptForKYC) {
        const { kyc, ...rest } = state as KYCStep;
        return {
          ...rest,
          step: "kyc-form",
          details: payload,
          kyc: kyc
            ? kyc
            : (payload.method === "stripe" || payload.method === "paypal") &&
                payload.email
              ? { kycEmail: payload.email }
              : undefined,
        };
      }
      return {
        ...(state as SubmitStep),
        step: "submit",
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
        ...(state as SubmitStep),
        step: "submit",
        liquidSplitPct: payload,
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
  setTxStatus,
} = donation.actions;
