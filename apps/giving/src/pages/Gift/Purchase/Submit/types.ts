import { TxOptions } from "@ap/types";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: TxOptions };
