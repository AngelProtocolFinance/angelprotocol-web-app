import { SchemaShape } from "schemas/types";
import { DonaterConfigFromWidget, WidgetURLSearchParams } from "types/widget";
import { number, object, string } from "yup";

const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  liquidSplitPct: number().required().min(0).max(100),
  fixedSplit: string().oneOf(["true", "false"]),
});

export default function parseConfig(
  searchParams: URLSearchParams
): { error: unknown } | { config: DonaterConfigFromWidget } {
  try {
    const parsedConfig = Object.fromEntries(
      searchParams.entries()
    ) as WidgetURLSearchParams;

    try {
      schema.validateSync(parsedConfig);
    } catch (err: any) {
      if ("message" in err) {
        throw `Invalid search parameters: ${err.message}`;
      }
      throw err;
    }

    return {
      config: {
        isSplitFixed: parsedConfig.fixedSplit === "true",
        liquidSplitPct: +parsedConfig.liquidSplitPct,
      },
    };
  } catch (error) {
    return { error };
  }
}