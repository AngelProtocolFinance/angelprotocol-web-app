import { OptionType } from "components/Selector";

export type FormValues = {
  hideText: boolean;
  hideEndowmentGauges: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
