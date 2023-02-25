import { EndowmentIdName } from "@giving/types/aws";
import { OptionType } from "@giving/types/components/selector";

export type FormValues = {
  endowIdName: EndowmentIdName;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
