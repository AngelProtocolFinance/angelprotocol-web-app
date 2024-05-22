import type { EndowmentOption } from "./aws";
import type { DonateMethodId } from "./lists";

export type Method = {
  id: DonateMethodId;
  name: string;
  disabled: boolean;
};

export type WidgetConfig = {
  endowment: EndowmentOption;
  isDescriptionTextShown: boolean;
  splitDisabled: boolean;
  liquidSplitPct: number;
  methods: Method[];
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";
  liquidSplitPct: string;
  splitDisabled: "true" | "false";
  /** csv of method ids */
  methods?: string;
};
