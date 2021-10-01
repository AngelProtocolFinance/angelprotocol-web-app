import { AccAddress } from "@terra-money/terra.js";
import { ReactNode } from "react";

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

interface ToFund {
  to: "fund";
  receiver?: number;
  children: ReactNode;
}

interface ToCharity {
  to: "charity";
  receiver: AccAddress;
  children: ReactNode;
}

export type Props = ToFund | ToCharity;

export type Status = WithResult & WithEstimate;

export type SetStatus = (result: Status) => void;
