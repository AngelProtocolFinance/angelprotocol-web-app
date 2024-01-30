import { PaypalDonationDetails, PaypalFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
} & PaypalFormStep;

export type FormValues = Omit<PaypalDonationDetails, "method">;