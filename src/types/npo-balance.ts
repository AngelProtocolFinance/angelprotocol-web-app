import type { Balance } from "@better-giving/balance";

export interface BalanceMovement {
  /** investment */
  "liq-lock": number;
  /** withdrawal from savings */
  "liq-cash": number;
  /** withdrawal from sustainability fund */
  "lock-cash": number;
  /** savings */
  "lock-liq": number;
}

export interface NpoBalances
  extends Omit<
    Balance.V2Attributes,
    | "version"
    | "sfInvestments"
    | "sfPendingContributions"
    | "sfWeeklyContributions"
  > {}
