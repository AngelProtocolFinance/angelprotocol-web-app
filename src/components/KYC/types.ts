import { KYCData } from "types/aws";
import { DonaterProps } from "components/Transactors/Donater";

export type PrevTxDetails = { txHash: string; chainId: string };
export type FormValues = KYCData;

export type OnDonation = {
  type: "on-donation";
  donaterProps: DonaterProps;
  walletAddr: string; //use to direct user to donations page
  txHash?: never;
}; //receipt received immediately after donation

//receipt requested in donation logs
type PostDonation = {
  type: "post-donation";
  walletAddr?: never;
  donaterProps?: never;
  txHash: string;
};

export type Props = (OnDonation | PostDonation) & {
  isKYCRequired?: boolean;
};
