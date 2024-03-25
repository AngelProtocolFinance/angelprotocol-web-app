import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  isSplitDisabled: boolean;
  liquidPercentage: number;
};
