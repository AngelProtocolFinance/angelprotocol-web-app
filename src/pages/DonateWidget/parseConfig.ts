import { SchemaShape } from "schemas/types";
import { DonaterConfigFromWidget, WidgetURLSearchParams } from "types/widget";
import { number, object, string } from "yup";

const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  splitDisabled: string().required().oneOf(["true", "false"]),
  isDescriptionTextShown: string().required().oneOf(["true", "false"]),
  liquidSplitPct: number().required().min(0).max(100),
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
        isDescriptionTextShown: parsedConfig.isDescriptionTextShown === "true",
        splitDisabled: parsedConfig.splitDisabled === "true",
        liquidSplitPct: +parsedConfig.liquidSplitPct,
      },
    };
  } catch (error) {
    return { error };
  }
}
