import { DonaterConfigFromWidget } from "types/widget";
import { Currency } from "components/CurrencySelector";
import { StripeFormStep } from "slices/donation";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
} & StripeFormStep;

export type FormValues = {
  amount: string;
  currency: Currency;
  email: string;
  pctLiquidSplit: number;
  userOptForKYC: boolean;
};
