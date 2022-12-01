import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { Token } from "./aws";

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type TokenWithAmount = Token & { amount: string };
