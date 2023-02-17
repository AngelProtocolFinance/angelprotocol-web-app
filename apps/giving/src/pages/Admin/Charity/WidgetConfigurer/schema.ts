import { OptionType } from "@/components/Selector";
import { EndowmentIdName } from "@/types/aws";

export type FormValues = {
  endowIdName: EndowmentIdName;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
