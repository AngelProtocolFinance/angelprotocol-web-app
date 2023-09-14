import { EndowmentOption, Token } from "types/aws";
import { OptionType } from "components/Selector";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  isAdvancedOptionsHidden: boolean;
  isAdvancedOptionsExpanded: boolean;
  liquidPercentage: number;
  tokenWhitelist: OptionType<Token>[];
};
