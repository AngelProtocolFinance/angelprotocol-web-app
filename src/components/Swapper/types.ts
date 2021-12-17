export interface Values {
  is_buy: boolean;
  amount: string;
  slippage: "0.1" | "0.5" | "1.0" | "2.0";
  return_amount: string;
  pct_commission: string;
  pct_change: string;
}
