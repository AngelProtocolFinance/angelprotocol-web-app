import type { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  splitDisabled: boolean;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  liquidSplitPct: string;
  splitDisabled: "true" | "false";
};
