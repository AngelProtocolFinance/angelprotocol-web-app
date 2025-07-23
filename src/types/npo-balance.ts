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
