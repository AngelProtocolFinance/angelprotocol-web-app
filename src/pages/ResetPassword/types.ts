export type CodeRecipientEmail = {
  raw: string;
  obscured: string;
};

type InitStep = {
  type: "init";
};

type SetPasswordStep = {
  type: "set-password";
  codeRecipientEmail: CodeRecipientEmail;
};

type SuccessStep = {
  type: "success";
};

export type Steps = InitStep | SetPasswordStep | SuccessStep;

export type StepSetter = React.Dispatch<React.SetStateAction<Steps>>;
