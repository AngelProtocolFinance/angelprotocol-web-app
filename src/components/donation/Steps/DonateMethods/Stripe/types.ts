import { DonaterConfigFromWidget } from "types/widget";
import { StripeDonationDetails, StripeFormStep } from "slices/donation";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
} & StripeFormStep;

export type FormValues = Omit<StripeDonationDetails, "method">;
