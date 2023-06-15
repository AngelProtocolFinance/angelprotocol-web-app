export type Fees = {
  earlyWithdraw: Fee;
  withdrawal: Fee;
  deposit: Fee;
  balance: Fee;
};

export type Fee = {
  isActive: boolean;
  receiver: string;
  rate: string /* "1" - "100" */;
};

export type Splits /** locked */ = {
  isCustom: boolean; //modifiable by contributors
  default: string;
  min: string;
  max: string;
};
