export interface Payment {
  /**
   * nowpayments - number,
   * custom - string uuid
   */
  id: number | string;
  address: string;
  extra_address?: string | null;
  amount: number;
  currency: string;
  description: string;
  /** token.code */
}
