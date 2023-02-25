import { EstimatedTx } from "@giving/slices/donation";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };
