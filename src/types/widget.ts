import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextHidden: boolean;
  isSplitFixed: boolean;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  isDescriptionTextHidden?: "true" | "false";
  liquidSplitPct: string;
  fixedSplit?: "true" | "false";
};

export type DonaterConfigFromWidget = Omit<WidgetConfig, "endowment"> & {
  isPreview?: boolean;
};
