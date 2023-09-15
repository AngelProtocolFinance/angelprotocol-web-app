import { EndowmentOption, TokenWithChainID } from "./aws";

type AdvanceOptionsDisplay = "hidden" | "collapsed" | "expanded";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  advancedOptions: {
    display: AdvanceOptionsDisplay;
    liquidSplitPct: number;
  };
  tokenWhiteList: TokenWithChainID[];
};

export type TokensRecord = Record<
  string /** chain id */,
  Record<string, string> /** token_id map */
>;

export type WidgetURLSearchParams = {
  endowId: string;
  isDescriptionTextShown: "true" | "false";
  advancedOptionsDisplay: AdvanceOptionsDisplay;
  liquidSplitPct: string;
  tokenWhiteList: string; //base64 encoded TokensRecord
};
