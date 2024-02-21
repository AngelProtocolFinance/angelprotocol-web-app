import { DafDonationDetails, DafFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
} & DafFormStep;

export type FormValues = Omit<DafDonationDetails, "method">;
