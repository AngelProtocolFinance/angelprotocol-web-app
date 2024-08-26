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

export type UserType = "donor" | "non-profit";

export type FormValues = {
  email: string;
  emailConfirmation: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: UserType;
};
