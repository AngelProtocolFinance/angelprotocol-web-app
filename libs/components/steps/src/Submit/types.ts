import { EstimatedTx } from "@ap/slices/donation";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };
