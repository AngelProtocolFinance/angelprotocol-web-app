import { SchemaShape } from "schemas/types";
import { DonaterConfigFromWidget, WidgetURLSearchParams } from "types/widget";
import { ValidationError, number, object, string } from "yup";

const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  splitDisabled: string().required().oneOf(["true", "false"]),
  isDescriptionTextShown: string().required().oneOf(["true", "false"]),
  liquidSplitPct: number().required().min(0).max(100),
});

export default function parseConfig(
  searchParams: URLSearchParams
): DonaterConfigFromWidget | { error: unknown } {
  try {
    const parsedConfig = schema.validateSync(
      Object.fromEntries(searchParams.entries())
    ) as WidgetURLSearchParams;

    return {
      isDescriptionTextShown: parsedConfig.isDescriptionTextShown === "true",
      splitDisabled: parsedConfig.splitDisabled === "true",
      liquidSplitPct: +parsedConfig.liquidSplitPct,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: `Invalid search parameters: ${error.message}` };
    }
    return { error };
  }
}
