import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CountryOption } from "services/types";
import { Token } from "types/aws";

export type DonationState = InitStep | FormStep | KYCStep | SubmitStep | TxStep;

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
        ...(state as KYCStep),
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
        ...(state as SubmitStep),
        step: 3,
        kyc: payload,
      };
    },

    setTxStatus(state, { payload }: PayloadAction<TxStatus>) {
      return {
        ...(state as SubmitStep),
        step: 4,
        status: payload,
      };
    },

    setStep(state, { payload }: PayloadAction<number>) {
      state.step = payload as DonationState["step"];
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
  country: CountryOption;
  state: string;
  email: string;
  hasAgreedToTerms: boolean;
  agreedToGetUpdates: boolean;
};

export type SkippableKYC = KYC | "skipped";

type InitStep = {
  step: 0;
  recipient?: DonationRecipient;
};

export type FormStep = {
  step: 1;
  details?: DonationDetails;
} & Omit<Required<InitStep>, "step">;

export type KYCStep = {
  step: 2;
  kyc?: SkippableKYC;
} & Omit<Required<FormStep>, "step">;

export type SubmitStep = {
  step: 3;
} & Omit<Required<KYCStep>, "step">;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type TxStep = {
  step: 4;
  status: TxStatus;
} & Omit<SubmitStep, "step">;
