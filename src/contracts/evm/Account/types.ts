import { Query } from "../types";
import {
  EndowmentDetails,
  EndowmentState,
  SettingsControllerUpdate,
} from "types/contracts";
import { AccountType, ERC20Deposit, NewAIF } from "types/contracts/evm";

export type Queries = {
  queryEndowmentDetails: Query<{ id: number }, EndowmentDetails>;
  queryState: Query<{ id: number }, EndowmentState>;
  queryTokenAmount: Query<
    { id: number; accounType: AccountType; token: string },
    string
  >;
};

export type QueryType = keyof Queries;

export type Functions = { [key in QueryType]: Queries[key]["args"] } & {
  createEndowment: { aif: NewAIF };
  depositERC20: { args: ERC20Deposit };
  updateEndowmentController: { update: SettingsControllerUpdate };
};

/**
 * By creating an event template constant and creating a type from it we enable the following:
 *   1. The parent's event decoder (decodeEventInternal) knows how to populate the expected event arguments
 *   2. The parent's event decoder can preserve type-safety
 *   3. The Account can create a wrapper around the parent's event decoder to ensure only expected events can be decoded
 *      using its (Account's) `decodeEvent` method
 *
 * IMPORTANT: it is crucial to have event arguments in the same order as they appear in the event from the logs.
 */
export const EVENT_TEMPLATES = {
  EndowmentCreated: {
    endowId: 0,
  },
} as const;

export type Events = typeof EVENT_TEMPLATES;
