import { KYCData } from "types/aws";
import { DonaterProps } from "components/Transactors/Donater";

export type PrevTxDetails = { txHash: string; chainId: string };
export type FormValues = KYCData;

type OnDonation = {
  type: "on-donation";
  donaterProps: DonaterProps;
  txHash?: never;
}; //receipt received immediately after donation

//receipt requested in donation logs
type PostDonation = {
  type: "post-donation";
  donaterProps?: never;
  txHash: string;
};

export type Props = OnDonation | PostDonation;
