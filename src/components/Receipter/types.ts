import { ReceiptPayload } from "types/server/aws";

export type PrevTxDetails = { txHash: string; chainId: string };
export type ReceipterValues = ReceiptPayload & { prevTx?: PrevTxDetails };
