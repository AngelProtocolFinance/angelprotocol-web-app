import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Token } from "types/aws";

export type DonationState = FormStep | SubmitStep | TxStep;

const initialState: DonationState = { step: 1 };

const donation = createSlice({
  name: "donate",
  initialState: initialState as DonationState,
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
      state.step = payload as DonationState["step"];
    },
  },
});

export default donation.reducer;
export const { setStep, setDetails, resetDetails, setTxStatus } =
  donation.actions;

export type TokenWithAmount = Token & { amount: string };

export type GiftDetails = {
  token: TokenWithAmount;
  recipient: string;

  //meta
  chainId: string;
  tokens: TokenWithAmount[];
};

export type FormStep = {
  step: 1;
  details?: GiftDetails;
};

export type SubmitStep = {
  step: 2;
} & Omit<Required<FormStep>, "step">;

export type TxStatus = { loadingMsg: string } | "error" | { depositId: string };
export type TxStep = {
  step: 3;
  status: TxStatus;
} & Omit<SubmitStep, "step">;
