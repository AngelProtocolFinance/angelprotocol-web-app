import type { EndowmentOption } from "./aws";
import type { OptionType, TDonateMethod } from "./components";

export type WidgetConfig = {
  title?: string;
  isTitleShown: boolean;
  description?: string;
  endowment: EndowmentOption;
  program: OptionType<string>;
  isDescriptionTextShown: boolean;
  methods: TDonateMethod[];
  /** hex color without alpha */
  accentPrimary?: string;
  /** hex color without alpha */
  accentSecondary?: string;
  /** string integers */
  increments: { value: string }[];
};

export type WidgetURLSearchParams = {
  isDescriptionTextShown: "true" | "false";

  // v2.3 params //

  /** csv of method ids */
  methods?: string;
  title?: string;
  /** set to "true" if not defined */
  isTitleShown?: "true" | "false";
  description?: string;
  /** csv of colors arranged as primary,secondary */
  accentPrimary?: string;
  accentSecondary?: string;
  programId?: string;
  /** csv of increments e.g. 40, 100, 500 */
  increments?: string;
};
