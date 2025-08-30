import type { IRebalancePayload as FV } from "@better-giving/nav-history/schemas";
export {
  type IRebalancePayload as FV,
  type IRebalanceTx as Tx,
  type IBals,
  ticker_nets,
  rebalance_log as fv,
} from "@better-giving/nav-history/schemas";

export interface FormState {
  type: "form";
  data?: FV;
}

export interface ReviewState {
  type: "review";
  data: FV;
}

export type State = FormState | ReviewState;
