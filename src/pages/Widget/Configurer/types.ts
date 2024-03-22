import { EndowmentOption } from "types/aws";

export type FormValues = {
  endowment: EndowmentOption;
  isSplitFixed: boolean;
  liquidPercentage: number;
};
