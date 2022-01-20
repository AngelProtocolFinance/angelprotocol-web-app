export enum Step {
  form = "form",
  confirm = "confirm",
  submit = "submit",
  broadcast = "broadcast",
  success = "success",
  error = "error",
  receipt = "receipt",
}

export type Tx = {
  txHash: string;
  amount?: string;
  to?: "charity" | "fund" | "tca";
  receiver?: number | string;
};

export type Content = {
  message: string;
  url?: string;
  tx?: Tx;
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
