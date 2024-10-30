import type { SignUp, SignUpUserType } from "types/auth";
export type UserType = SignUpUserType;

export type CodeRecipientEmail = {
  /** lowercased */
  raw: string;
  obscured: string;
};

type InitState = {
  type: "init";
};

type ConfirmState = {
  type: "confirm";
  userType: UserType;
  codeRecipientEmail: CodeRecipientEmail;
};

type SuccessState = {
  type: "success";
  userType: UserType;
};

export type SignupState = InitState | ConfirmState | SuccessState;
export type StateSetter = React.Dispatch<React.SetStateAction<SignupState>>;

export type FormValues = SignUp;
