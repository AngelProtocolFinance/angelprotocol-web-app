import type { Environment } from "@better-giving/types/list";

export interface IBalanceKey {
  network: Environment;
  /** npo id */
  id: number;
}

interface Movement {
  /** investment */
  "liq-lock": number;
  /** withdrawal from savings */
  "liq-cash": number;
  /** withdrawal from sustainability fund */
  "lock-cash": number;
  /** savings, lock - liq */
  "lock-liq": number;
}

export interface MovementIndexKeys {
  /** @deprecated */
  movement?: Environment;
  /** @deprecated */
  movementDetails?: Movement;
}

export interface IBalanceV1Attr {
  /** @deprecated */
  totalTips?: number;
  /** @deprecated - ?*/
  donationsBal?: number;
  /** @deprecated - ? */
  payoutsMade?: number;
  /** @deprecated - ? */
  payoutsMadeDonation?: number;
  /** @deprecated  - ?*/
  payoutsMadeGrant?: number;
  /** @deprecated - ? */
  sustainabilityFundBal?: number;
  /** @deprecated - ?*/
  totalGrantsEarned?: number;

  /** @deprecated */
  version?: 2;

  /** @deprecated amount already invested */
  sfInvestments?: number;
  /** @deprecated resets to 0 quarterly */
  sfPendingContributions?: number;
  /** @deprecated resets to 0 weekly */
  sfWeeklyContributions?: number;
  /** savings balance, initially 0 */
}

interface IBalanceAttr {
  liq?: number;
  lock_units?: number;
  /** pending payouts */
  cash?: number;

  contributionsCount: number;
  totalContributions: number;
  totalContributionsViaMarketplace?: number;
  totalContributionsViaWidget?: number;
  totalBaseFees?: number;
  totalFiscalSponsorFees?: number;
  totalProcessingFees?: number;
  /** would be migrated to `"cash"` */
  payoutsPending: number;
}

export interface IBalance
  extends IBalanceKey,
    IBalanceAttr,
    IBalanceV1Attr,
    MovementIndexKeys {}

export interface IBalanceV2 extends IBalanceKey, IBalanceAttr {}

export interface IPrettyBalance {
  liq: number;
  cash: number;
  lock_units: number;
  /** life to date donations */
  ltd: number;
}

export interface IBalanceUpdateables
  extends Pick<
    IBalance,
    | "totalContributions"
    | "contributionsCount"
    | "totalContributionsViaMarketplace"
    | "totalContributionsViaWidget"
    | "payoutsPending"
    | "totalBaseFees"
    | "totalProcessingFees"
    | "totalFiscalSponsorFees"
    | "totalTips"
    | "liq"
    | "lock_units"
    | "cash"
  > {}

export type BalanceUpdateType = "inc" | "dec" | "set";
export type IBalanceUpdate = Partial<{
  [K in keyof IBalanceUpdateables]: [BalanceUpdateType, number];
}>;

export type TBalKeys = keyof IBalanceV2;
export type TArrayValues<T extends readonly unknown[]> = T[number];
export type TBalProjectedTo<T> = T extends TBalKeys[]
  ? Pick<IBalance, TArrayValues<T>>
  : IBalance;
