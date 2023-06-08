import { WithdrawInfo } from "services/types";
import { AxelarBridgeFees } from "types/aws";
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
  reason: string;

  //meta
  _amounts: string; //collective amounts error
  height: number;
  type: AccountType;
  fees: WithdrawInfo["withdraw"];
};

export type WithdrawerProps = {
  balance: GenericBalance;
  type: AccountType;
  fees: AxelarBridgeFees["withdraw"];
};
//form meta
