import { TxOptions } from "@ap/types/slices";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: TxOptions };
