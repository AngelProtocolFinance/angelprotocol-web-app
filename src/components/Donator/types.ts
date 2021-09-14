export type Handler = () => void;

export interface Values {
  amount: string;
}

export enum Status {
  success = "success",
  error = "error",
  initial = "initial",
}

export interface Result {
  status: Status;
  message: string;
}

export type ResultSetter = (c: Result) => void;
