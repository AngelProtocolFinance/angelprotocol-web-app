type ConfirmState = {
  codeRecipientEmail: string;
};
export type SignupState = "init" | ConfirmState | "success";
export type StateSetter = React.Dispatch<React.SetStateAction<SignupState>>;
