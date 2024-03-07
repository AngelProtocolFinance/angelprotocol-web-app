export type CodeRecipientEmail = {
  raw: string;
  obscured: string;
};

type InitStep = {
  type: "init";
};

type ConfirmOTPStep = {
  type: "confirm-otp";
  codeRecipientEmail: CodeRecipientEmail;
};

type NewPasswordStep = {
  type: "new-password";
};

type SuccessStep = {
  type: "success";
};

export type Steps = InitStep | ConfirmOTPStep | NewPasswordStep | SuccessStep;

export type StepSetter = React.Dispatch<React.SetStateAction<Steps>>;
