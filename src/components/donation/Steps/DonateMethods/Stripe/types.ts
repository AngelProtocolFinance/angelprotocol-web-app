import type { StripeDonationDetails, StripeFormStep } from "slices/donation";
import type { Config } from "../../types";

export type Props = {
  widgetConfig: Config | null;
} & StripeFormStep;

export type FormValues = Omit<StripeDonationDetails, "method" | "frequency"> & {
  frequency: StripeDonationDetails["frequency"] | "";
};
