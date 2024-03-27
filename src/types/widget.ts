import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  isSplitDisabled: boolean;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  liquidSplitPct: string;
  splitDisabled: "true" | "false";
};

export type DonaterConfigFromWidget = Omit<WidgetConfig, "endowment"> & {
  isPreview?: boolean;
};
