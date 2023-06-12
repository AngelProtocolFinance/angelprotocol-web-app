export type Fees = {
  withdrawal: Fee;
  deposit: Fee;
  earnings: Fee;
};

export type Fee = {
  isActive: boolean;
  receiver: string;
  rate: string /* "1" - "100" */;
};
