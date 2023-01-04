import { TokenWithBalance } from "services/types";
import { EncodeObject, StdFee } from "types/cosmos";

export type TxOptions = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type TokenWithAmount = TokenWithBalance & { amount: string };
