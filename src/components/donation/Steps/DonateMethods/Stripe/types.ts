import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
