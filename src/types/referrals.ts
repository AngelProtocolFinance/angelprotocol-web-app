import type { Payout } from "@better-giving/referrals/interface";

export interface Referred {
  id: number;
  name: string;
  up_until: string;
  ltd: number;
}

export interface Earning {
  amount: number;
  date: string;
  donation: {
    id: string;
    to_id: string;
    to_name: string;
  };
  status: "paid" | "pending";
}

export interface EarningsPage {
  items: Earning[];
  nextKey?: string;
}

export interface PayoutsPage {
  items: Payout[];
  nextKey?: string;
}

export interface PendingEarnings {
  total: number;
}
