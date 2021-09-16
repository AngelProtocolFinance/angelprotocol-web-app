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
}

export interface Estimates {
  amount: number;
  fee: number;
}

export type Details = Estimates;

export interface Status {
  step: Steps;
  message?: string;
  details?: Details;
}

export type SetStatus = (result: Status) => void;
