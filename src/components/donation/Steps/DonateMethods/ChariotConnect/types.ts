import { ChariotDonationDetails, ChariotFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig?: DonaterConfigFromWidget;
} & ChariotFormStep;

export type FormValues = Omit<ChariotDonationDetails, "method">;
