import { KYC, KYCStep } from "@ap/slices/donation";

export type PrevTxDetails = { txHash: string; chainId: string };

export type FormValues = KYC;

export type OnDonation = {
  type: "on-donation";
  state: KYCStep;
  txHash?: never;
}; //receipt received immediately after donation

//receipt requested in donation logs
type PostDonation = {
  type: "post-donation";
  state?: never;
  txHash: string;
};

export type Props = (OnDonation | PostDonation) & { classes?: string };
