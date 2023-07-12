import { IERC20, WithdrawFees } from "services/types";
import { EndowmentType } from "types/lists";
import { AccountType } from "types/lists";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
};

export type FV = {
  amounts: Amount[];
  network: string;
  beneficiary: string;

  //meta
  _amounts: string; //collective amounts error
  endowType: EndowmentType;
  type: AccountType;
  fees: WithdrawFees;
};

export type WithdrawerProps = {
  balances: IERC20[];
  type: AccountType;
  fees: WithdrawFees;
};
//form meta
