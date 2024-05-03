import type { DafDonationDetails, DafFormStep } from "slices/donation";
import type { Config } from "../../types";

export type Props = {
  widgetConfig: Config | null;
} & DafFormStep;

export type FormValues = Omit<DafDonationDetails, "method">;
