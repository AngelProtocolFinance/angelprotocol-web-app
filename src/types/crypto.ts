export interface Payment {
  /**
   * nowpayments - number,
   * custom - string uuid
   */
  id: number | string;
  /** bg counterpart */
  order_id: string;
  address: string;
  extra_address?: string | null;
  amount: number;
  /** usd / amount, use to determine optimal number of decimals */
  rate: number;
  currency: string;
  description: string;
  /** token.code */
}
