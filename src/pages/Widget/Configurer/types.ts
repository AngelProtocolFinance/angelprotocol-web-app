import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextHidden: boolean;
  isSplitFixed: boolean;
  liquidPercentage: number;
};
