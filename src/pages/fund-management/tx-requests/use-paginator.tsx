import { useFetcher } from "@remix-run/react";
import { Info } from "components/status";
import { type FunctionComponent, useEffect, useState } from "react";

interface Page<T> {
  items: T[];
  next?: string;
}

export interface ITable<T>
  extends FunctionComponent<{
    items: T[];
    load_next?: () => void;
    loading?: boolean;
    disabled?: boolean;
    classes?: string;
  }> {}

interface Props<T> {
  page1: Page<T>;
  Table: ITable<T>;
  classes?: string;
  gen_loader: (loader_fn: (href: string) => void, next: string) => () => void;
}

export function use_paginator<I>({
  Table,
  page1,
  classes = "",
  gen_loader,
}: Props<I>) {
  const { state, data, load } = useFetcher<Page<I>>();
  const [items, set_items] = useState<I[]>(page1.items);

  useEffect(() => {
    set_items(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state !== "idle" || !data) return;
    set_items((prev) => [...prev, ...(data as Page<I>).items]);
  }, [state, data]);

  if (items.length === 0) {
    return <Info classes={classes}>No records found</Info>;
  }

  const next = data ? (data as Page<I>).next : page1.next;
  return (
    <Table
      classes={classes}
      items={items}
      load_next={next ? gen_loader(load, next) : undefined}
      disabled={state !== "idle"}
      loading={state === "loading"}
    />
  );
}
