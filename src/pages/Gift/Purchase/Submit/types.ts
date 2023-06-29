import { SignDoc } from "types/cosmos";

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; doc: SignDoc };
