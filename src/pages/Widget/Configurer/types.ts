import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  hideDescription: boolean;
  isSplitFixed: boolean;
  liquidPercentage: number;
};
