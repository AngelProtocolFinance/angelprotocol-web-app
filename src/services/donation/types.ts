export type WalletStates = Array<[Wallets, boolean]>;

export enum Wallets {
  none = "none",
  ethereum = "ethereum",
  terra = "terra",
  phantom = "phantom",
  keplr = "keplr",
}

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
