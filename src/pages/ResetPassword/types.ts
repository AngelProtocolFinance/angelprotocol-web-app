export type CodeRecipientEmail = {
  raw: string;
  obscured: string;
};

type InitStep = {
  type: "init";
};

type NewPasswordStep = {
  type: "new-password";
  codeRecipientEmail: CodeRecipientEmail;
};

type SuccessStep = {
  type: "success";
};

export type Steps = InitStep | NewPasswordStep | SuccessStep;

export type StepSetter = React.Dispatch<React.SetStateAction<Steps>>;
