export type CodeRecipientEmail = {
  raw: string;
  obscured: string;
};

type ConfirmState = {
  codeRecipientEmail: CodeRecipientEmail;
};

export type SignupState = "init" | ConfirmState | "success";
export type StateSetter = React.Dispatch<React.SetStateAction<SignupState>>;
