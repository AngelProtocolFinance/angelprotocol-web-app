import { search } from "helpers/https";
import { type IWidgetSearchObj, widget_search } from "types/widget";
import { safeParse } from "valibot";

export function parse_config(
  searchParams: URLSearchParams
): IWidgetSearchObj | { error: string } {
  const { issues, output: config } = safeParse(
    widget_search,
    search(searchParams)
  );

  if (issues) {
    return { error: `Donation form config is invalid: ${issues[0].message}` };
  }
  return config;
}
