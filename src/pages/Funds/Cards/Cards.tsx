import type { FundsPage } from "@better-giving/fundraiser";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { Info } from "components/status";
import { useEffect, useState } from "react";
import Card from "./Card";

interface Props {
  classes?: string;
  page1: FundsPage;
}

function next(p?: FundsPage) {
  const { page = 1, numPages = 1 } = p || {};
  return page < numPages ? page + 1 : undefined;
}
export default function Cards({ classes = "", page1 }: Props) {
  const { data, state, load } = useFetcher<FundsPage>({
    key: "funds",
  }); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(page1.items);

  useEffect(() => {
    if (!data || state === "loading") return;
    if (data) {
      if (data.page === 1) return setItems(data.items);
      setItems((prev) => [...prev, ...data.items]);
    }
  }, [data, state]);

  if (items.length === 0) {
    return <Info classes="mt-4">No fundraisers found</Info>;
  }

  const nextPage = data ? next(data) : next(page1);

  function loadNext(nextPage: number) {
    const n = new URLSearchParams(params);
    n.set("page", nextPage.toString());
    load(`?${n.toString()}`);
  }
  return (
    <div
      className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
    >
      {items.map((fund) => (
        <Card {...fund} key={fund.id} />
      ))}

      {nextPage && (
        <button
          className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={() => loadNext(nextPage)}
          disabled={state !== "idle"}
        >
          Load more funds
        </button>
      )}
    </div>
  );
}
