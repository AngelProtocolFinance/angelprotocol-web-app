import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};
