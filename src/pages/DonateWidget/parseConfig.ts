import type { SchemaShape } from "schemas/types";
import type { DonateMethodId } from "types/lists";
import type { WidgetConfig, WidgetURLSearchParams } from "types/widget";
import { type ValidationError, number, object, string } from "yup";

const allMethodIds: DonateMethodId[] = ["crypto", "daf", "stocks", "stripe"];

const hexColor = /^#[0-9A-F]{6}$/i;
const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  splitDisabled: string().required().oneOf(["true", "false"]),
  isDescriptionTextShown: string().required().oneOf(["true", "false"]),
  liquidSplitPct: number().required().min(0).max(100),
  methods: string().test("valid csv", "invalid methods", (val) => {
    return Array.from(new Set(val?.split(","))).every((id) =>
      allMethodIds.includes(id as DonateMethodId)
    );
  }),
  increments: string().test("valid csv", "invalid increments", (val) => {
    return val
      ?.split(",")
      .every((val) => number().positive().isValidSync(+val));
  }),
  accentPrimary: string().matches(hexColor, "invalid color format"),
  accentSecondary: string().matches(hexColor, "invalid color format"),
  title: string().max(100),
  programId: string().uuid(),
  description: string().max(300),
});

export type Parsed = Omit<
  WidgetConfig,
  "endowment" | "methods" | "program" | "increments"
> & {
  methodIds?: DonateMethodId[];
  increments: number[];
  programId?: string;
};

export default function parseConfig(
  searchParams: URLSearchParams
): Parsed | { error: string } {
  try {
    const { methods: methodsCsv, ...config } = schema.validateSync(
      Object.fromEntries(searchParams.entries())
    ) as WidgetURLSearchParams;

    const methodIds = (methodsCsv?.split(",") || [
      "stripe",
      "stocks",
      "daf",
      "crypto",
    ]) as DonateMethodId[];

    return {
      isDescriptionTextShown: config.isDescriptionTextShown === "true",
      splitDisabled: config.splitDisabled === "true",
      liquidSplitPct: +config.liquidSplitPct,
      programId: config.programId,
      methodIds,
      title: config.title,
      isTitleShown: (config.isTitleShown ?? "true") === "true",
      description: config.description,
      accentPrimary: config.accentPrimary,
      accentSecondary: config.accentSecondary,
      increments: config.increments?.split(",").map(Number) || [40, 100, 200],
    };
  } catch (error) {
    const message = (error as ValidationError).message;
    return {
      error: `Donation Form config is invalid: ${message}.`,
    };
  }
}
