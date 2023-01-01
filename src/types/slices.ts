import { EncodeObject, StdFee } from "types/cosmos";
import { Token } from "./aws";

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type TokenWithAmount = Token & { amount: string };
