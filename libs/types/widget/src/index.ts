export type ConfigParams = {
  hideAdvOpts?: boolean;
  unfoldAdvOpts?: boolean;
  liquidPct?: number;
  availCurrs?: string[];
};
export type UrlParamValues = ConfigParams & { hideText: boolean };
