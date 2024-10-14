import { Info } from "components/Status";
import { useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import type { Page } from "../types";
import Card from "./Card";

interface Props {
  classes?: string;
  firstPage: Page;
}

export default function Cards({ classes = "", firstPage }: Props) {
  const fetcher = useFetcher<Page>(); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(firstPage.Items);

  /**  */
  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") return;
    if (fetcher.data) {
      setItems((prev) => [...prev, ...(fetcher.data?.Items || [])]);
    }
  }, [fetcher.data, fetcher.state]);

  if (items.length === 0) {
    return <Info>No organisations found</Info>;
  }

  const currPage = fetcher.data?.Page ?? 1;
  const hasMore = currPage < firstPage.NumOfPages;

  function loadNext() {
    const nextPage = (fetcher.data?.Page ?? 1) + 1;
    const n = new URLSearchParams(params);
    n.set("page", nextPage.toString());
    fetcher.load(`?${n.toString()}`);
  }

  return (
    <div
      className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
    >
      {items.map((endow) => (
        <Card {...endow} key={endow.id} />
      ))}

      {hasMore && (
        <button
          type="button"
          disabled={fetcher.state === "loading"}
          className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={loadNext}
        >
          Load more organizations
        </button>
      )}
    </div>
  );
}
