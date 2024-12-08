import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import type { WidgetData } from "api/donate-widget-loader";
import { Info, LoadingStatus } from "components/Status";
import { useEffect } from "react";
import { useFetcher, useLoaderData, useSearchParams } from "react-router-dom";

type Props = {
  searchText: string;
};

export default function Options({ searchText }: Props) {
  const params = useSearchParams()[0].toString();
  const { endows: initEndows } = useLoaderData() as WidgetData;
  const fetcher = useFetcher<WidgetData>();

  //biome-ignore lint: no need for other deps
  useEffect(() => {
    const copy = new URLSearchParams(params);
    copy.set("query", searchText);
    fetcher.load(`?${copy.toString()}`);
  }, [searchText, params]);

  const opts = ((fr) => {
    if (fr.state === "loading") {
      return (
        <LoadingStatus classes="w-full text-sm p-2">
          Loading options..
        </LoadingStatus>
      );
    }

    const endows = fr.data?.endows || initEndows;
    if (endows.length === 0) {
      return <Info classes="w-full text-sm p-2">{searchText} not found</Info>;
    }

    return endows.map((endow) => (
      <ComboboxOption
        className="data-[selected]:bg-blue-l2 cursor-pointer flex gap-2 p-2 text-sm"
        key={endow.name}
        value={endow}
      >
        {endow.name}
      </ComboboxOption>
    ));
  })(fetcher);

  return (
    <ComboboxOptions className="absolute left-0 max-h-60 top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller">
      {opts}
    </ComboboxOptions>
  );
}
