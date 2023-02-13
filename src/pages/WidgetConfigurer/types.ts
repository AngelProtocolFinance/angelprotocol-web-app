import { EndowmentIdName } from "types/aws";
import { OptionType } from "components/Selector";

export type State = {
  endowIdName: EndowmentIdName;
  hideText: boolean;
  hideAdvancedOptions: boolean;
  unfoldAdvancedOptions: boolean;
  liquidPercentage: number;
  availableCurrencies: OptionType<string>[];
};
