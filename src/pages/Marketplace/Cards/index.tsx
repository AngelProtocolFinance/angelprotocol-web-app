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
  const { data, state, load } = useFetcher<Page>({
    key: "marketplace",
  }); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(firstPage.Items);

  /**  */
  useEffect(() => {
    if (!data || state === "loading") return;
    if (data) {
      if (data.Page === 1) return setItems(data.Items);
      setItems((prev) => [...prev, ...data.Items]);
    }
  }, [data, state]);

  if (items.length === 0) {
    return <Info>No organisations found</Info>;
  }

  const hasMore =
    (data?.Page ?? 1) < (data?.NumOfPages ?? 1 ?? firstPage.NumOfPages);

  function loadNext() {
    const nextPage = (data?.Page ?? 1) + 1;
    const n = new URLSearchParams(params);
    n.set("page", nextPage.toString());
    load(`?${n.toString()}`);
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
          disabled={state === "loading"}
          className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={loadNext}
        >
          Load more organizations
        </button>
      )}
    </div>
  );
}
