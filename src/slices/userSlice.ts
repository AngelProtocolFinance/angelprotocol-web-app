import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Role: string;
  SK?: string;
  PK?: string;
  CharityName: string;
  CharityName_ContactEmail?: string;
  RegistrationDate: string;
  RegistrationStatus: string;
  EmailVerified: boolean;
  ProofOfIdentity?: any;
  ProofOfEmployment?: any;
  EndowmentAgreement?: any;
  ProofOfIdentityVerified?: any;
  ProofOfEmploymentVerified?: any;
  EndowmentAgreementVerified?: any;
  WalletAddress?: any;
  IsKeyPersonCompleted?: boolean;
  IsMetaDataCompleted?: boolean;
  token?: string;
}

const initialState: IUser = {
  Email: "",
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Role: "",
  PK: "",
  SK: "",
  CharityName: "",
  CharityName_ContactEmail: "",
  RegistrationDate: "",
  RegistrationStatus: "",
  EmailVerified: false,
  token: "",
  ProofOfIdentity: "",
  ProofOfEmployment: "",
  EndowmentAgreement: "",
  ProofOfIdentityVerified: "",
  ProofOfEmploymentVerified: "",
  EndowmentAgreementVerified: "",
  WalletAddress: "",
  IsKeyPersonCompleted: false,
  IsMetaDataCompleted: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (_, { payload }: PayloadAction<IUser>) => payload,
    removeUserData: () => initialState,
  },
});

export default userSlice.reducer;
export const { updateUserData, removeUserData } = userSlice.actions;
