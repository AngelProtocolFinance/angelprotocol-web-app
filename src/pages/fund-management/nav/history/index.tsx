import type { IPage } from "@better-giving/nav-history";
import { Info, LoadingStatus } from "components/status";
import useSWR from "swr/immutable";
import { Table } from "./table";

export const cache_key = "nav-history";
const fetcher = ([, key]: [string, string | null]) =>
  fetch(`/api/nav-logs${key ? `?next=${key}` : ""}`).then<IPage>((res) =>
    res.json()
  );

interface Props {
  classes?: string;
}

export function History({ classes = "" }: Props) {
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    [cache_key, null],
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
    const res = await fetcher([cache_key, next_key]);
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
      <h4 className="text-lg mb-2">Logs</h4>

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
