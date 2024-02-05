import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextHidden: boolean;
  isAdvancedOptionsHidden: boolean;
  isAdvancedOptionsExpanded: boolean;
  liquidPercentage: number;
};
