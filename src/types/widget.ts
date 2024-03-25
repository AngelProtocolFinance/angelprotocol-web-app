import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  hideDescription: boolean;
  isSplitDisabled: boolean;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  hideDescription?: "true" | "false";
  liquidSplitPct: string;
  splitDisabled?: "true" | "false";
};

export type DonaterConfigFromWidget = Omit<WidgetConfig, "endowment"> & {
  isPreview?: boolean;
};
