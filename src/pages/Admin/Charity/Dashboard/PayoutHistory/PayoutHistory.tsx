import { Info } from "components/Status";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useSearchParams } from "react-router-dom";
import type { BalanceTxsPage } from "types/aws";
import type { DashboardData } from "../route";
import Table from "./Table";

export function PayoutHistory({ classes = "" }) {
  const [params] = useSearchParams();
  const { balTxs } = useLoaderData() as DashboardData;

  const [items, setItems] = useState<BalanceTxsPage["items"]>(balTxs.items);

  const { data, state, load } = useFetcher<BalanceTxsPage>({ key: "bal-txs" });

  useEffect(() => {
    if (!data || state !== "idle") return;
    setItems((prev) => [...prev, ...data.items]);
  }, [data, state]);

  const nextPageKey = data ? data.nextPageKey : balTxs.nextPageKey;

  return (
    <div className={`${classes} grid content-start`}>
      <h4 className="text-lg mb-2">Transaction history</h4>

      {items.length === 0 ? (
        <Info>No record found</Info>
      ) : (
        <Table
          records={items}
          hasMore={!!nextPageKey}
          onLoadMore={() => {
            const copy = new URLSearchParams(params);
            if (nextPageKey) copy.set("nextPageKey", nextPageKey);
            load(`?${copy.toString()}`);
          }}
          disabled={state === "loading"}
          isLoading={state === "loading"}
        />
      )}
    </div>
  );
}
