import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { Info, LoadingStatus } from "components/status";
import { useEffect } from "react";
import { useFetcher, useSearchParams } from "react-router";
import type { EndowmentOption } from "types/npo";
import type { WidgetData } from "../../api";

type Props = {
  search_text: string;
  init_opts: EndowmentOption[];
};

export function Options({ search_text, init_opts }: Props) {
  const params = useSearchParams()[0].toString();
  const fetcher = useFetcher<WidgetData>();

  //biome-ignore lint: no need for other deps
  useEffect(() => {
    const copy = new URLSearchParams(params);
    copy.set("query", search_text);
    fetcher.load(`?${copy.toString()}`);
  }, [search_text, params]);

  const opts = ((fr) => {
    if (fr.state === "loading") {
      return (
        <LoadingStatus classes="w-full text-sm p-2">
          Loading options..
        </LoadingStatus>
      );
    }

    const endows = fr.data?.endows || init_opts;
    if (endows.length === 0) {
      return <Info classes="w-full text-sm p-2">{search_text} not found</Info>;
    }

    return endows.map((endow) => (
      <ComboboxOption
        className="data-selected:bg-blue-l2 cursor-pointer flex gap-2 p-2 text-sm"
        key={endow.name}
        value={endow}
      >
        {endow.name}
      </ComboboxOption>
    ));
  })(fetcher);

  return (
    <ComboboxOptions className="absolute left-0 max-h-60 top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded-sm overflow-y-scroll scroller">
      {opts}
    </ComboboxOptions>
  );
}
