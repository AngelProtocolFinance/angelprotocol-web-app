import type { EndowmentOption } from "./aws";
import { TDonateMethod } from "./components";

export type WidgetConfig = {
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
  /** csv of method ids */
  methods?: string;
};
