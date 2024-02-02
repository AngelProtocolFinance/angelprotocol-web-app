import { DonationRecipient, KYC } from "slices/donation";

export type FormValues = KYC;

export type OnDonation = {
  type: "on-donation";
  recipient: DonationRecipient;
  /** provided in donate step */
  donationEmail?: string;
  onBack: () => void;
}; //receipt received immediately after donation

//receipt requested in donation logs
type PostDonation = {
  type: "post-donation";
  txHash: string;
};

export type Props = (OnDonation | PostDonation) & {
  classes?: string;
  defaultValues?: FormValues;
  onSubmit: (formValues: FormValues) => void | Promise<void>;
};
