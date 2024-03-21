import { EndowmentOption } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  liquidSplitPct: number;
};

export type WidgetURLSearchParams = {
  liquidSplitPct: string;
};

export type DonaterConfigFromWidget = Pick<WidgetConfig, "liquidSplitPct"> & {
  isPreview?: boolean;
};
