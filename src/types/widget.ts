import { EndowmentOption } from "./aws";

type AdvanceOptionsDisplay = "hidden" | "collapsed" | "expanded";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  advancedOptions: {
    display: AdvanceOptionsDisplay;
    liquidSplitPct: number;
  };
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  advancedOptionsDisplay: AdvanceOptionsDisplay;
  liquidSplitPct: string;
};

type ValidConfig = {
  isFallback: false;
  isDescriptionTextShown: boolean;
  advancedOptionsDisplay: AdvanceOptionsDisplay;
  liquidSplitPct: number;
};

type FallbackConfig = {
  isFallback: true;
  isDescriptionTextShown: true;
  advancedOptionsDisplay: Extract<AdvanceOptionsDisplay, "expanded">;
  liquidSplitPct: 50;
};

export type DonaterConfigFromWidget = ValidConfig | FallbackConfig;

export const configIsFallback = (
  config: DonaterConfigFromWidget,
): config is FallbackConfig => config.isFallback;
