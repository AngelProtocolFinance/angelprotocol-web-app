import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { DonationIntent, Donor } from "types/aws";
import type { ChainID } from "types/chain";
import type {
  CryptoResultStep,
  DonationDetails,
  DonationRecipient,
  DonationState,
  DonationStep,
  FormStep,
  SplitsStep,
  SubmitStep,
  SummaryStep,
  TipFormat,
  TipStep,
  TxStatus,
} from "./types";

const initialState: DonationState = { step: "init" };

const donation = createSlice({
  name: "donate",
  initialState: initialState as DonationState,
  reducers: {
    loadIntent: (
      _,
      {
        payload,
      }: PayloadAction<DonationIntent & { recipient: DonationRecipient }>
    ) => {
      if ("walletAddress" in payload) {
        return {
          step: "submit",
          details: {
            method: "crypto",
            chainId: {
              label: payload.chainName,
              value: payload.chainId as ChainID,
            },
            source: payload.source,
            token: {
              amount: `${payload.amount}`,
              ...payload.token,
            },
          },
          donor: payload.donor,
          format: "pct",
          intentTransactionId: payload.transactionId,
          tip: payload.tipAmount,
          liquidSplitPct: payload.splitLiq,
          recipient: payload.recipient,
        };
      }
      return {
        step: "submit",
        details: {
          method: "stripe",
          amount: `${payload.amount}`,
          currency: {
            code: payload.currency.currency_code,
            min: payload.currency.minimum_amount,
            rate: payload.currency.rate,
          },
          frequency: payload.frequency,
          source: payload.source,
        },
        donor: payload.donor,
        format: "pct",
        intentTransactionId: payload.transactionId,
        tip: payload.tipAmount,
        liquidSplitPct: payload.splitLiq,
        recipient: payload.recipient,
      };
    },
    setRecipient: (_, { payload }: PayloadAction<DonationRecipient>) => {
      return { step: "donate-form", recipient: payload };
    },
    setDetails: (state, { payload }: PayloadAction<DonationDetails>) => {
      //when changing donation method, reset
      const curr: DonationState =
        state.step === "donate-form" && state.details?.method !== payload.method
          ? { step: "donate-form", recipient: state.recipient }
          : state;

      //skip donor,splits for stocks,daf, as not being used
      if (payload.method === "stocks" || payload.method === "daf") {
        return {
          ...(curr as SplitsStep),
          step: "submit",
          details: payload,
          //these steps where skipped so provide placeholders
          tip: 0,
          format: "pct",
          donor: { firstName: "", lastName: "", email: "" },
          liquidSplitPct: 50,
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
      if (state.recipient?.hide_bg_tip) {
        return {
          ...(state as SummaryStep),
          step: "summary",
          liquidSplitPct: payload,
        };
      }
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
        ...(state as SummaryStep),
        step: "summary",
        tip: payload.tip,
        format: payload.format,
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
  loadIntent,
  setRecipient,
  setStep,
  setDetails,
  resetDetails,
  setSplit,
  setTip,
  setDonor,
  setTxStatus,
} = donation.actions;
