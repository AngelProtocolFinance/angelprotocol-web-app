import { OptionType } from "@giving/components/Selector";
import { EndowmentIdName } from "@giving/types/aws";

export type FormValues = {
  endowIdName: EndowmentIdName;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
