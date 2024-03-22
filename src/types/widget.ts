import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  hideDescription: boolean;
  isSplitFixed: boolean;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  hideDescription?: "true" | "false";
  liquidSplitPct: string;
  fixedSplit?: "true" | "false";
};

export type DonaterConfigFromWidget = Omit<WidgetConfig, "endowment"> & {
  isPreview?: boolean;
};
