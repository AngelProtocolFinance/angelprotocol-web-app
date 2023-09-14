import { EndowmentOption, Token } from "./aws";

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  advancedOptions: {
    display: "hidden" | "collapsed" | "expanded";
    liquidSplitPCT: number;
  };
  tokens: Token[];
};
