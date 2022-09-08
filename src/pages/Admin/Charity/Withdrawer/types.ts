import { AccountType, GenericBalance } from "types/contracts";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
  type: "cw20" | "native";
};

export type WithdrawValues = {
  amounts: Amount[];
  network: string;
  beneficiary: string;

  //meta
  _amounts: string; //collective amounts error
  type: AccountType;
};

export type Props = {
  balance: GenericBalance;
  type: AccountType;
};
//form meta
