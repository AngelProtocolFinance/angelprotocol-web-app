import { DafDonationDetails, DafFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";

export type Props = {
  widgetConfig: DonaterConfigFromWidget | null;
} & DafFormStep;

export type FormValues = Omit<DafDonationDetails, "method">;
