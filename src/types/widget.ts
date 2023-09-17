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

type ChainID = string;
type Symbol = string;
export type TokensWhitelist = [ChainID, Symbol][];
export type TokensLookup = Record<ChainID, Record<Symbol, true>>;

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  advancedOptionsDisplay: AdvanceOptionsDisplay;
  liquidSplitPct: string;
  tokenWhiteList: string;
};

type ValidConfig = {
  isDescriptionTextShown: boolean;
  advancedOptionsDisplay: AdvanceOptionsDisplay;
  liquidSplitPct: number;
  tokensLookup: TokensLookup;
};

type FallbackConfig = {
  isDescriptionTextShown: true;
  advancedOptionsDisplay: Extract<AdvanceOptionsDisplay, "expanded">;
  liquidSplitPct: 50;
  tokensLookup: "all";
};

export type DonaterConfigFromWidget = ValidConfig | FallbackConfig;

export const configIsFallback = (
  config: DonaterConfigFromWidget
): config is FallbackConfig => config.tokensLookup === "all";
