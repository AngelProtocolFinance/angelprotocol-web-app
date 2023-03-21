import { AccountType, GenericBalance } from "types/contracts";
import { ChainID } from "constants/chains";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
  type: "cw20" | "native";
};

export type WithdrawValues = {
  amounts: Amount[];
  network: ChainID;
  beneficiary: string;
  reason: string;

  //meta
  _amounts: string; //collective amounts error
  height: number;
  type: AccountType;
};

export type WithdrawerProps = {
  balance: GenericBalance;
  type: AccountType;
};
//form meta
