export interface BalanceTx {
  /** iso */
  date: string;
  endowId: number;
  environment: string;
  to: "cash" | "liq" | "lock" | "unprocessed";
  from: "donation" | "liq" | "lock";
  amount: number;
}

export interface BalanceTxsPage {
  items: BalanceTx[];
  nextPageKey?: string;
}

export interface BalanceTxsQueryParams {
  endowId: number;
  nextPageKey?: string;
}
