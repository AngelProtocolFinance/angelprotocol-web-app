import { WidgetParams } from "@giving/types/pages/widget";

export const URL_PARAMS: { [key: string]: keyof WidgetParams } = {
  hideText: "hideText",
  hideAdvancedOptions: "hideAdvOpts",
  unfoldAdvancedOptions: "unfoldAdvOpts",
  liquidPercentage: "liquidPct",
  availableCurrencies: "availCurrs",
} as const;
