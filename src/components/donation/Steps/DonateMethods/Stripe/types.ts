import { StripeDonationDetails, StripeFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";

export type Props = {
  widgetConfig?: DonaterConfigFromWidget;
} & StripeFormStep;

export type FormValues = Omit<StripeDonationDetails, "method">;
