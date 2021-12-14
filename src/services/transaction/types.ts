export enum Step {
  form = "form",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
}
export type Content = {
  message: string;
  url?: string;
};
export type Stage = {
  step: Step;
  content: Content | null;
};
export type PendingTx = { amount: number; hash: string };
export type State = {
  form_loading: boolean;
  form_error: string;
  fee: number;
  stage: Stage;
};
