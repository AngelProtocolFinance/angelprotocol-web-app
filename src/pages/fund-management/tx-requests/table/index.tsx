import type {
  IBalanceTxsPage,
  IBalanceTxsPageOptions,
  TStatus,
} from "@better-giving/balance-txs";
import { Info, LoadingStatus } from "components/status";
import useSWR from "swr/immutable";
import { Table } from "./table";

export const cache_key = "nav-txs";
const fetcher = async ([, opts]: [string, IBalanceTxsPageOptions]) => {
  const search = new URLSearchParams();
  if (opts?.status) search.set("status", opts.status);
  if (opts?.next) search.set("next", opts.next);
  if (opts?.limit) search.set("limit", opts.limit.toString());
  return fetch(
    `/api/nav-txs${search.size > 0 ? `?${search.toString()}` : ""}`
  ).then<IBalanceTxsPage>((res) => res.json());
};

interface Props {
  classes?: string;
  status: TStatus;
}

export function Requests({ classes = "", status }: Props) {
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    [cache_key, { status }],
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
  if (items.length === 0)
    return (
      <Info classes={classes}>No {status.toLowerCase()} records found</Info>
    );

  async function load(next_key: string) {
    const res = await fetcher([cache_key, { status, next: next_key }]);
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
    <Table
      classes={classes}
      records={items}
      onLoadMore={next ? () => load(next) : undefined}
      disabled={isValidating}
      isLoading={isValidating}
    />
  );
}
