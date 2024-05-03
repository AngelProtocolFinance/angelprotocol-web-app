import type { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  splitDisabled: boolean;
  liquidPercentage: number;
};
