import { IERC20 } from "services/types";
import { EndowmentType } from "types/contracts";
import { AccountType } from "types/lists";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
};

export type WithdrawValues = {
  amounts: Amount[];
  network: string;
  beneficiary: string;

  reason: string;

  //meta
  _amounts: string; //collective amounts error
  endowType: EndowmentType;
  type: AccountType;
};

export type WithdrawerProps = {
  balances: IERC20[];
  type: AccountType;
};
//form meta
