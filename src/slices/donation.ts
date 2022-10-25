import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = Step0 | Step1 | Step2 | Step3;

const initialState: State = { step: 0 };

const donation = createSlice({
  name: "donate",
  initialState: initialState as State,
  reducers: {
    setRecipient: (_, { payload }: PayloadAction<DonationRecipient>) => {
      return { step: 1, recipient: payload };
    },
  },
});

export default donation.reducer;
export const { setRecipient } = donation.actions;

export type DonationRecipient = {
  id: number;
  name: string;
};

type DonationDetails = {
  amount: number;
  liquidSplit?: number;
};

type KYC = {
  name: string;
};

type Step0 = {
  step: 0;
  details?: never;
  kyc?: never;
  recipient?: never;
};

type Step1 = {
  step: 1;
  details?: never;
  kyc?: never;
  recipient: DonationRecipient;
};

type Step2 = {
  step: 2;
  details: DonationDetails;
  kyc?: never;
  recipient: DonationRecipient;
};

type Step3 = {
  step: 3;
  details: DonationDetails;
  kyc: KYC;
  recipient: DonationRecipient;
};
