import { Coin } from "@cosmjs/proto-signing";
import { GenericBalance } from "types/server/contracts";
import CW20 from "contracts/CW20";

export type Amount = {
  id: string;
  amount: string;
  balance: string;
  type: "cw20" | "native";
};

export type WithdrawValues = {
  amounts: Amount[];
  network: "bnb" | "eth" | "juno";
  beneficiary: string;
};

export type Props = {
  balance: GenericBalance;
};
//form meta
