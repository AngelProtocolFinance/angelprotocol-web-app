import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  liquidSplitPct: number;
  isSplitFixed: boolean;
};

export type WidgetURLSearchParams = {
  liquidSplitPct: string;
  fixedSplit?: "true" | "false";
};

export type DonaterConfigFromWidget = Omit<WidgetConfig, "endowment"> & {
  isPreview?: boolean;
};
