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

export type EndowmentBalances = {
  contributionsCount: number;
  donationsBal: number;
  payoutsMade: number;
  payoutsPending: number;
  sustainabilityFundBal: number;
  totalContributions: number;
  totalEarnings?: number;
  movementDetails?: BalanceMovement;
  /** savings balance */
  liq?: number;
};
