import type { INpoPayoutsPage } from "@better-giving/payouts";
import { Info, LoadingStatus } from "components/status";
import useSWR from "swr/immutable";
import { PayoutsTable } from "../common/payouts-table";

const fetcher = ([, id, key]: [string, number, string | null]) =>
  fetch(
    `/api/npo/${id}/payouts${key ? `?nextKey=${key}` : ""}`
  ).then<INpoPayoutsPage>((res) => res.json());

interface Props {
  id: number;
  classes?: string;
}

export function Payouts({ classes = "", id }: Props) {
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    ["payouts", id, null],
    fetcher
  );

  if (isLoading) {
    return (
      <LoadingStatus classes="mt-4 text-sm">Loading payouts...</LoadingStatus>
    );
  }

  if (error || !data) {
    return <Info classes="mt-4">Failed to get payouts</Info>;
  }

  const { items, next } = data;
  if (items.length === 0) return <Info>No payouts found</Info>;

  async function load(next_key: string) {
    const res = await fetcher(["payouts", id, next_key]);
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
      {items.length === 0 ? (
        <Info>No record found</Info>
      ) : (
        <PayoutsTable
          records={items}
          onLoadMore={next ? () => load(next) : undefined}
          disabled={isValidating}
          isLoading={isValidating}
        />
      )}
    </div>
  );
}
