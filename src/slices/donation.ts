import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { KYCData, Token } from "types/aws";

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
        step: 2, //set to next
        details: payload,
        recipient: state.recipient!, //user can't go to step 2 without completing step 1
      };
    },
    setKYC: (state, { payload }: PayloadAction<KYC>) => {
      return {
        step: 3, //set to next
        kyc: payload,
        details: state.details!, //user can't go to step 3 without completing step 1
        recipient: state.recipient!,
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
  kyc?: KYCData;
  recipient: DonationRecipient;
};

export type Step3 = {
  step: 3;
  details: DonationDetails;
  kyc: KYC;
  recipient: DonationRecipient;
};
