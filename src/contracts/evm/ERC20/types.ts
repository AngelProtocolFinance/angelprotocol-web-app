import { Query } from "../types";
import { Allowance, Transfer } from "types/contracts/evm/erc20";

export type Queries = {
  balance: Query<{ addr: string }, string>;
};

export type QueryType = keyof Queries;

export type Functions = { [key in QueryType]: Queries[key]["args"] } & {
  transfer: { args: Transfer };
  approve: { args: Allowance };
};

/**
 * By creating an event template constant and creating a type from it we enable the event decoder to preserve type-safety.
 * 
 * IMPORTANT: it is crucial to have event arguments in the same order as they appear in the event from the logs.
 */
export const EVENT_TEMPLATES = {} as const;

export type Events = typeof EVENT_TEMPLATES;
