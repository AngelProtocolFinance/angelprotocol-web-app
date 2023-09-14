import { EndowmentOption, Token } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  isAdvancedOptionsHidden: boolean;
  isAdvancedOptionsExpanded: boolean;
  liquidPercentage: number;
  tokenWhitelist: Token[];
};
