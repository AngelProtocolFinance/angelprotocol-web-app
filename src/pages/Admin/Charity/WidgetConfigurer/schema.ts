import { EndowmentOption } from "types/aws";
import { OptionType } from "components/Selector";

export type FormValues = {
  endowment: EndowmentOption;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
