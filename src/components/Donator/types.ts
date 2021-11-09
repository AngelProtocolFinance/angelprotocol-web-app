import { AccAddress } from "@terra-money/terra.js";
import { ReactNode } from "react";

export type Handler = () => void;

export interface Values {
  amount: string;
  split: number;
  receiptRequested: boolean;
  fullName: string;
  email: string;
  streetAddress: string;
  addressComplement: string;
  city: string;
  zipCode: string;
  stateAddress: string;
  country: string;
}

export enum Steps {
  initial = "initial",
  confirm = "confirm",
  ready = "ready",
  waiting = "waiting",
  no_result = "noresult",
  success = "success",
  error = "error",
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

interface WithoutResult {
  step: Steps;
  message?: string;
  url?: string;
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
  maxSplitLiq?: number;
  minSplitLiq?: number;
}

interface ToCharity {
  to: "charity";
  receiver: AccAddress;
  children: ReactNode;
  //doesn't know yet limits on charity donations
  maxSplitLiq?: never;
  minSplitLiq?: never;
}

export type Props = ToFund | ToCharity;

export type Status = WithResult & WithEstimate & WithoutResult;

export type SetStatus = (result: Status) => void;
