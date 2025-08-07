import { useFetcher } from "@remix-run/react";
import { Info } from "components/status";
import { type ReactNode, useEffect, useState } from "react";
import type { IPaginator } from "types/components";

interface ViaKey {
  next?: string;
}
interface ViaNums {
  page: number;
  num_pages: number;
}

type Via = ViaKey | ViaNums;

type Page<T> = {
  items: T[];
} & Via;

function np(via: Via): string | undefined {
  if ("page" in via) {
    const { page = 1, num_pages = 1 } = via || {};
    const n = page < num_pages ? page + 1 : undefined;
    return n?.toString();
  }
  return via.next;
}

interface Props<T> {
  id?: string;
  classes?: string;
  page1: Page<T>;
  table: (props: IPaginator<T>) => ReactNode;
  empty?: (props: { classes?: string }) => ReactNode;
  gen_loader: (loader_fn: (href: string) => void, next: string) => () => void;
}

export function use_paginator<I>({
  table,
  empty,
  page1,
  gen_loader,
  id,
  classes = "",
}: Props<I>) {
  const { state, data, load } = useFetcher<Page<I>>({ key: id });
  const [items, set_items] = useState<I[]>(page1.items);

  useEffect(() => {
    set_items(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state !== "idle" || !data) return;
    if ("page" in data && data.page === 1) {
      return set_items(data.items as I[]);
    }
    set_items((prev) => [...prev, ...(data as Page<I>).items]);
  }, [state, data]);

  const next = data ? np(data) : np(page1);
  const node = (({ empty: et, table: t, ...x }): ReactNode => {
    if (x.items.length === 0) {
      return (
        et?.({ classes: x.classes }) || (
          <Info classes={x.classes}>No records found</Info>
        )
      );
    }
    return t({
      ...x,
      load_next: next ? x.gen_loader(x.load, next) : undefined,
      disabled: x.state !== "idle",
      loading: x.state !== "idle",
    });
  })({
    items,
    next,
    load,
    gen_loader,
    state,
    empty,
    table,
    classes,
  });

  return { node, loading: state !== "idle", load, items };
}
