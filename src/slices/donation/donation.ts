import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CryptoResultStep,
  DonationDetails,
  DonationRecipient,
  DonationState,
  DonationStep,
  Donor,
  FormStep,
  SplitsStep,
  SubmitStep,
  SummaryStep,
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

    setSplit: (state, { payload }: PayloadAction<number>) => {
      return {
        ...(state as SummaryStep),
        step: "summary",
        liquidSplitPct: payload,
      };
    },
    setDonor: (state, { payload }: PayloadAction<Donor>) => {
      return {
        ...(state as SubmitStep),
        step: "submit",
        donor: payload,
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
  setSplit,
  setTxStatus,
} = donation.actions;
