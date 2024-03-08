import { StripeDonationDetails, StripeFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";

export type Props = {
  widgetConfig: DonaterConfigFromWidget | null;
} & StripeFormStep;

export type FormValues = Omit<StripeDonationDetails, "method" | "frequency"> & {
  frequency: StripeDonationDetails["frequency"] | "";
};
