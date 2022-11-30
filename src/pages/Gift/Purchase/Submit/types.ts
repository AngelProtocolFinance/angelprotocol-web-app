import { TxOptions } from "slices/transaction/types";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: TxOptions };
