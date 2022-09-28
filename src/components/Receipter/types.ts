import { ReceiptPayload } from "types/aws";

export type PrevTxDetails = { txHash: string; chainId: string };
export type ReceipterValues = ReceiptPayload & { prevTx?: PrevTxDetails };

type PreDonation = { type: "pre-donation" };
type PostDonation = { type: "post-donation"; txHash: string };
export type Props = PreDonation | PostDonation;
