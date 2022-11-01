import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Token } from "types/aws";

export type DonationState = InitStep | FormStep | KYCStep | SubmitStep;

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
        ...(state as Omit<KYCStep, "details">),
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
        ...(state as Omit<SubmitStep, "kyc">),
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
export const { setRecipient, setStep, setDetails, resetDetails, setKYC } =
  donation.actions;

export type TokenWithAmount = Token & { amount: string };
export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
};

export type DonationDetails = {
  token: TokenWithAmount;
  pctLiquidSplit: string;

  //meta
  chainId: string;
  chainName: string;
  tokens: TokenWithAmount[];
};

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: string;
  state: string;
  email: string;
  hasAgreedToTerms: boolean;
};

export type SkippableKYC = KYC | "skipped";

type InitStep = {
  step: 0;
  recipient?: DonationRecipient;
};

export type FormStep = {
  step: 1;
  recipient: DonationRecipient;
  details?: DonationDetails;
};

export type KYCStep = {
  step: 2;
  recipient: DonationRecipient;
  details: DonationDetails;
  kyc?: SkippableKYC;
};

export type SubmitStep = {
  step: 3;
  recipient: DonationRecipient;
  details: DonationDetails;
  kyc: SkippableKYC;
};

type ResultStep = {
  step: 4;
  status:
    | "loading"
    | "error"
    | (Pick<SubmitStep, "details" | "kyc" | "recipient"> & {
        hash: string;
        chainId: string;
      });
};
