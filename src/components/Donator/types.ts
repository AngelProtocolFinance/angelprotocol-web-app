export type Handler = () => void;

export interface Values {
  amount: string;
}

export enum Steps {
  success = "success",
  error = "error",
  initial = "initial",
  confirm = "confirm",
  ready = "ready",
  waiting = "waiting",
}

interface Estimates {
  amount: number;
  txFee: number;
  total: number;
}

interface Result {
  received: number;
  deposited: number;
  url: string;
}

interface WithResult {
  step: Steps;
  message?: string;
  result?: Result;
}

interface WithEstimate {
  step: Steps;
  message?: string;
  estimates?: Estimates;
}

export type Status = WithResult & WithEstimate;

export type SetStatus = (result: Status) => void;
