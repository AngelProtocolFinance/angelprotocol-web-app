export type EndowmentAddrParams = { address: string };

type LockedSummary = {
  type: "locked";
  balance: number;
  isOwner?: never;
  opener?: never;
};

type LiquidSummary = {
  type: "liquid";
  balance: number;
  isOwner: boolean;
  opener: () => void;
};

export type HoldingSummary = LockedSummary | LiquidSummary;
