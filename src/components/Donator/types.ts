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

export interface Status {
  step: Steps;
  message?: string;
  details?: any;
}

export type SetStatus = (result: Status) => void;
