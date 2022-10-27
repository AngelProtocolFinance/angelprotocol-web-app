import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Token } from "types/aws";

export type DonationState = Step0 | Step1 | Step2 | Step3;

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
        ...(state as Step2),
        step: 2,
        details: payload,
      };
    },
    setKYC: (state, { payload }: PayloadAction<SkippableKYC>) => {
      return {
        ...(state as Step3),
        step: 3,
        kyc: payload,
      };
    },
    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload as DonationState["step"];
    },
  },
});

export default donation.reducer;
export const { setRecipient, setStep, setDetails, setKYC } = donation.actions;

export type TokenWithAmount = Token & { amount: string };
export type DonationRecipient = {
  id: number;
  name: string;
};

export type DonationDetails = {
  token: TokenWithAmount;
  pctLiquidSplit: string;
};

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: string;
  state: string;
  email: string;
};

export type SkippableKYC = KYC | "skipped";

type Step0 = {
  step: 0;
  details?: never;
  kyc?: never;
  recipient?: DonationRecipient;
};

export type Step1 = {
  step: 1;
  details?: DonationDetails;
  kyc?: never;
  recipient: DonationRecipient;
};

export type Step2 = {
  step: 2;
  details?: DonationDetails;
  kyc?: SkippableKYC;
  recipient: DonationRecipient;
};

export type Step3 = {
  step: 3;
  details: DonationDetails;
  kyc: KYC | "skipped";
  recipient: DonationRecipient;
};
