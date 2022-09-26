export interface SwapValues {
  is_buy: boolean;
  amount: string;
  slippage: "0.5" | "1.0" | "1.5" | "2.0";
  return_amount: string;
  pct_commission: string;
  ratio: number;
}
