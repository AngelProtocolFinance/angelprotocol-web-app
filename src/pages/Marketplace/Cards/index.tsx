import { useFetcher, useSearchParams } from "@remix-run/react";
import { Info } from "components/Status";
import { useEffect, useState } from "react";
import type { EndowCardsPage } from "types/aws";
import Card from "./Card";

interface Props {
  classes?: string;
  firstPage: EndowCardsPage;
}

function next(_page?: EndowCardsPage) {
  const { page = 1, numPages = 1 } = _page || {};
  return page < numPages ? page + 1 : undefined;
}

export default function Cards({ classes = "", firstPage }: Props) {
  const { data, state, load } = useFetcher<EndowCardsPage>({
    key: "marketplace",
  }); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(firstPage.items);

  useEffect(() => {
    if (!data || state === "loading") return;
    if (data) {
      if (data.page === 1) return setItems(data.items);
      setItems((prev) => [...prev, ...data.items]);
    }
  }, [data, state]);

  if (items.length === 0) {
    return <Info>No organisations found</Info>;
  }

  const nextPage = data ? next(data) : next(firstPage);

  function loadNext(nextPage: number) {
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

      {nextPage && (
        <button
          type="button"
          disabled={state === "loading"}
          className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={() => loadNext(nextPage)}
        >
          Load more organizations
        </button>
      )}
    </div>
  );
}
