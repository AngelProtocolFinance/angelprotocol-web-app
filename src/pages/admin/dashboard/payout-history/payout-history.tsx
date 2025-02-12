import { Info, LoadingStatus } from "components/status";
import useSWR from "swr/immutable";
import type { BalanceTxsPage } from "types/aws";
import Table from "./table";

const fetcher = ([, id, key]: [string, number, string | null]) =>
  fetch(
    `/api/npo/${id}/txs${key ? `?nextKey=${key}` : ""}`
  ).then<BalanceTxsPage>((res) => res.json());

interface Props {
  id: number;
  classes?: string;
}

export function PayoutHistory({ classes = "", id }: Props) {
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    ["txs", id, null],
    fetcher
  );

  if (isLoading) {
    return (
      <LoadingStatus classes="mt-4 text-sm">
        Loading transactions...
      </LoadingStatus>
    );
  }

  if (error || !data) {
    return <Info classes="mt-4">Failed to get transactions</Info>;
  }

  const { items, nextPageKey } = data;
  if (items.length === 0) return <Info>No record found</Info>;

  async function load(nextKey: string) {
    const res = await fetcher(["txs", id, nextKey]);
    mutate(
      (x) => {
        return {
          items: [...(x?.items || []), ...res.items],
          nextPageKey: res.nextPageKey,
        };
      },
      { revalidate: false }
    );
  }

  return (
    <div className={`${classes} grid content-start`}>
      <h4 className="text-lg mb-2">Transaction history</h4>

      {items.length === 0 ? (
        <Info>No record found</Info>
      ) : (
        <Table
          records={items}
          onLoadMore={nextPageKey ? () => load(nextPageKey) : undefined}
          disabled={isValidating}
          isLoading={isValidating}
        />
      )}
    </div>
  );
}
