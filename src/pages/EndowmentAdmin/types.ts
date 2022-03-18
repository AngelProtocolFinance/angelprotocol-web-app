import { Holding } from "services/terra/account/types";

export type EndowmentAddrParams = { address: string };

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
