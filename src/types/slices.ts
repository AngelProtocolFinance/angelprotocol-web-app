import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { TokenWithBalance } from "services/types";

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type TokenWithAmount = TokenWithBalance & { amount: string };
