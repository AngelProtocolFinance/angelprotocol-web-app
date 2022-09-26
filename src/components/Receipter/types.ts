import { ReceiptPayload } from "types/aws";

export type PrevTxDetails = { txHash: string; chainId: string };
export type ReceipterValues = ReceiptPayload & { prevTx?: PrevTxDetails };
