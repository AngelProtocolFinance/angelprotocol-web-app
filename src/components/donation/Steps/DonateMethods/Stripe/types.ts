import { Currency } from "components/CurrencySelector";
import { FormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import { type AdvancedOptionsDisplay } from "../../../AdvancedOptions";

export type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
  widgetConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};

export type FormValues = {
  amount: string;
  currency: Currency;
  email: string;
  pctLiquidSplit: number;
  userOptForKYC: boolean;
};
