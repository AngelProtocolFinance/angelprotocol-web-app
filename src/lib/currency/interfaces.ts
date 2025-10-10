export interface ICurrency {
  /** e.g. USD */
  code: string;
  value: {
    usd: number;
  };
}

export interface ICurrenciesMeta {
  /** iso date */
  last_updated: string;
}
