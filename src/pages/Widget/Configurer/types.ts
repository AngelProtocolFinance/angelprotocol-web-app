import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  hideDescription: boolean;
  isSplitDisabled: boolean;
  liquidPercentage: number;
};
