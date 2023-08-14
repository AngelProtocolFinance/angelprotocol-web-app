export type QueryRes<T> = {
  data: T[];
  total: number;
};

export type Transaction = {
  symbol: string;
  amount: number;
  status: string;
  call: {
    transactionHash: string;
  };
};
