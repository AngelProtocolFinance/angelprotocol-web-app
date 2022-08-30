import { GenericBalance } from "types/contracts";

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
};

export type Props = {
  balance: GenericBalance;
};
//form meta
