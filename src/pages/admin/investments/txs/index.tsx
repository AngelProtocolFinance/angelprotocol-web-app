import type { IBalanceTxsPage } from "@better-giving/balance-txs";
import { Info, LoadingStatus } from "components/status";
import useSWR from "swr/immutable";
import { Table } from "./table";

const cache_key = "bal-txs-lock";
const fetcher = ([, id, key]: [string, number, string | null]) =>
  fetch(
    `/api/npo/${id}/bal-txs/lock${key ? `?next=${key}` : ""}`
  ).then<IBalanceTxsPage>((res) => res.json());

interface Props {
  id: number;
  classes?: string;
}

export function Txs({ classes = "", id }: Props) {
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    [cache_key, id, null],
    fetcher
  );

  if (isLoading) {
    return (
      <LoadingStatus classes={`${classes} text-sm`}>
        Loading transactions...
      </LoadingStatus>
    );
  }

  if (error || !data) {
    return <Info classes={classes}>Failed to get transactions</Info>;
  }

  const { items, next } = data;
  if (items.length === 0) return <Info classes={classes}>No record found</Info>;

  async function load(next_key: string) {
    const res = await fetcher([cache_key, id, next_key]);
    mutate(
      (x) => {
        return {
          items: [...(x?.items || []), ...res.items],
          next: res.next,
        };
      },
      { revalidate: false }
    );
  }

  return (
    <div className={`${classes} grid content-start`}>
      <h4 className="text-lg mb-2">Transactions</h4>

      {items.length === 0 ? (
        <Info>No record found</Info>
      ) : (
        <Table
          records={items}
          onLoadMore={next ? () => load(next) : undefined}
          disabled={isValidating}
          isLoading={isValidating}
        />
      )}
    </div>
  );
}
