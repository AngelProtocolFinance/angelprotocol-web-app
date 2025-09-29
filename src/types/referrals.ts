import type { Payout } from "@better-giving/referrals/interface";
import type { IPageKeyed } from "@better-giving/types/api";

export interface Referred {
  id: number;
  name: string;
  up_until: string;
  ltd: number;
}

export interface PayoutsPage extends IPageKeyed<Payout> {}

export interface PendingEarnings {
  total: number;
}
