export interface CW20 {
  address: string;
  amount: string;
}

export type CW20Info = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};

export type CW20Balance = {
  balance: string;
};
