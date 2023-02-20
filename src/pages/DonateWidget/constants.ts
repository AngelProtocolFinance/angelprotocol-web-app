import { UrlParamValues } from "./types";

export const URL_PARAMS: { [key: string]: keyof UrlParamValues } = {
  hideText: "hideText",
  hideAdvancedOptions: "hideAdvOpts",
  unfoldAdvancedOptions: "unfoldAdvOpts",
  liquidPercentage: "liquidPct",
  availableCurrencies: "availCurrs",
} as const;
