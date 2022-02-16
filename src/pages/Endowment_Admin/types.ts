import { ReactNode } from "react";
import { DepositTransactions } from "services/aws/endowment_admin/types";
import { Holding } from "services/terra/account/types";

export type RouteParam = { address: string };

type Handler = () => void;

export interface Values {
  withdraw: string;
}

export interface WithdrawProps {
  address: string;
  liquid: number | undefined;
  isModalOpened: boolean;
  onCloseModal: Handler;
}

export interface PopupProps {
  message?: string;
  children?: ReactNode;
  onCloseModal: Handler;
}

export interface EstimatesProps {
  handleConfirm: Function;
  onCloseModal: Handler;
}

export interface ResultProps {
  onCloseModal: Handler;
}

export interface EndowmentAddrProps {
  address: string;
}

export interface TransactionItemProps {
  item: DepositTransactions;
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
  withdrawn: number;
  url: string;
}

interface WithEstimate {
  step: Steps;
  message?: string;
  estimates?: Estimates;
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

export type Status = WithEstimate & WithResult & WithoutResult;

export type SetStatus = (result: Status) => void;

type LockedSummary = {
  type: "locked";
  holdings: Holding[];
  isOwner?: never;
  opener?: never;
};

type LiquidSummary = {
  type: "liquid";
  holdings: Holding[];
  isOwner?: boolean;
  opener?: () => void;
};

export type HoldingSummary = LockedSummary | LiquidSummary;
