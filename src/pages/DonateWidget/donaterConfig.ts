import { SchemaShape } from "schemas/types";
import { DonaterConfigFromWidget, WidgetURLSearchParams } from "types/widget";
import { number, object, string } from "yup";

const schema = object<any, SchemaShape<WidgetURLSearchParams>>({
  advancedOptionsDisplay: string()
    .required()
    .oneOf(["hidden", "collapsed", "expanded"]),
  isDescriptionTextShown: string().required().oneOf(["true", "false"]),
  liquidSplitPct: number().required().min(0).max(100),
});

const fallbackConfig: DonaterConfigFromWidget = {
  isFallback: true,
  isDescriptionTextShown: true,
  advancedOptionsDisplay: "expanded",
  liquidSplitPct: 50,
};

export default function donaterConfig(
  searchParams: URLSearchParams,
): DonaterConfigFromWidget {
  try {
    const parsedConfig = Object.fromEntries(
      searchParams.entries(),
    ) as WidgetURLSearchParams;

    if (!schema.isValidSync(parsedConfig)) {
      return fallbackConfig;
    }

    return {
      isFallback: false,
      isDescriptionTextShown: parsedConfig.isDescriptionTextShown === "true",
      advancedOptionsDisplay:
        parsedConfig.advancedOptionsDisplay as DonaterConfigFromWidget["advancedOptionsDisplay"],
      liquidSplitPct: +parsedConfig.liquidSplitPct,
    };
  } catch (err) {
    console.error(err);
    return fallbackConfig;
  }
}
