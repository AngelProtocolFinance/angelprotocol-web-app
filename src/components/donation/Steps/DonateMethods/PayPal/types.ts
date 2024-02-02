import { PaypalDonationDetails, PaypalFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";

export type Props = {
  widgetConfig?: DonaterConfigFromWidget;
} & PaypalFormStep;

export type FormValues = Omit<PaypalDonationDetails, "method">;
