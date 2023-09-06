import { EndowmentSelectorOption } from "types/aws";
import { OptionType } from "components/Selector";

export type FormValues = {
  endowment: EndowmentSelectorOption;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
