export type ConfigParams = {
  hideAdvOpts?: boolean;
  unfoldAdvOpts?: boolean;
  liquidPct?: number;
  availCurrs?: string[];
};

export type WidgetParams = ConfigParams & {
  hideText: boolean;
};
