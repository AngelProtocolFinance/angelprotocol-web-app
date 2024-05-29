import type { EndowmentOption } from "./aws";
import type { TDonateMethod } from "./components";

export type WidgetConfig = {
  title?: string;
  isTitleShown: boolean;
  description?: string;
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  splitDisabled: boolean;
  liquidSplitPct: number;
  methods: TDonateMethod[];
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  liquidSplitPct: string;
  splitDisabled: "true" | "false";

  // v2.3 params //

  /** csv of method ids */
  methods?: string;
  title?: string;
  /** set to "true" if not defined */
  isTitleShown?: "true" | "false";
  description?: string;
};
