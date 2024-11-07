import { DONATION_INCREMENTS } from "constants/common";
import type { DonateMethodId } from "types/lists";
import {
  type Increment,
  type WidgetConfig,
  widgetUrlSearchParams,
} from "types/widget";
import { safeParse } from "valibot";

export type Parsed = Omit<
  WidgetConfig,
  "endowment" | "methods" | "program" | "increments"
> & {
  methodIds?: DonateMethodId[];
  increments: Increment[];
  programId?: string;
};

export default function parseConfig(
  searchParams: URLSearchParams
): Parsed | { error: string } {
  const { issues, output: config } = safeParse(
    widgetUrlSearchParams,
    Object.fromEntries(searchParams.entries())
  );

  if (issues) {
    return { error: `Donation form config is invalid: ${issues[0].message}` };
  }
  const { descriptions = [] } = config;
  return {
    isDescriptionTextShown: config.isDescriptionTextShown ?? false,
    programId: config.programId,
    methodIds: config.methods as DonateMethodId[] | undefined,
    title: config.title,
    isTitleShown: config.isTitleShown ?? false,
    description: config.description,
    accentPrimary: config.accentPrimary,
    accentSecondary: config.accentSecondary,
    increments: (
      config.increments?.map(Number) || DONATION_INCREMENTS.map((i) => i.value)
    ).map((x, i) => ({
      value: x,
      label: descriptions[i],
    })),
  };
}
