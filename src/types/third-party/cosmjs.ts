import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";

export type Tx = {
  msgs: EncodeObject[];
  fee: StdFee;
};
