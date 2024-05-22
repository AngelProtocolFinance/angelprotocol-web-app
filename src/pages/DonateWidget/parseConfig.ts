import type { SchemaShape } from "schemas/types";
import { DonateMethodId } from "types/lists";
import type { Method, WidgetConfig, WidgetURLSearchParams } from "types/widget";
import { type ValidationError, number, object, string } from "yup";

const allMethodIds: DonateMethodId[] = ["crypto", "daf", "stocks", "stripe"];

const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  splitDisabled: string().required().oneOf(["true", "false"]),
  isDescriptionTextShown: string().required().oneOf(["true", "false"]),
  liquidSplitPct: number().required().min(0).max(100),
  methods: string().test("valid csv", "invalid methods", (val) => {
    return Array.from(new Set(val?.split(","))).every((id) =>
      allMethodIds.includes(id as DonateMethodId)
    );
  }),
});

export default function parseConfig(
  searchParams: URLSearchParams
): Omit<WidgetConfig, "endowment"> | { error: string } {
  try {
    const { methods: methodsCsv, ...config } = schema.validateSync(
      Object.fromEntries(searchParams.entries())
    ) as WidgetURLSearchParams;

    const methodIds = (methodsCsv?.split(",") || []) as DonateMethodId[];

    return {
      isDescriptionTextShown: config.isDescriptionTextShown === "true",
      splitDisabled: config.splitDisabled === "true",
      liquidSplitPct: +config.liquidSplitPct,
      methods: methods(methodIds, allMethodIds),
    };
  } catch (error) {
    const message = (error as ValidationError).message;
    return {
      error: `Donation Form config is invalid: ${message}.`,
    };
  }
}

function methods(sub: DonateMethodId[], complete: DonateMethodId[]): Method[] {
  const full = new Set(complete);
  const existing = sub.filter((x) => full.has(x));
  const missing = complete.filter((x) => !existing.includes(x));
  return [...toMethods(existing), ...toMethods(missing, true)];
}

const methodNames: { [K in DonateMethodId]: string } = {
  crypto: "Crypto",
  daf: "DAF",
  stocks: "Stocks",
  stripe: "Card",
};

const toMethods = (ids: DonateMethodId[], disabled = false): Method[] =>
  ids.map((id) => ({
    id,
    name: methodNames[id],
    disabled,
  }));