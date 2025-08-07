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
  const node = (({ emt, t, is, c, n, gl, l, s }): ReactNode => {
    if (is.length === 0) {
      return emt?.({ classes: c }) || <Info classes={c}>No records found</Info>;
    }
    return t({
      items: is,
      load_next: n ? gl(l, n) : undefined,
      disabled: s !== "idle",
      loading: s !== "idle",
    });
  })({
    is: items,
    n: next,
    l: load,
    gl: gen_loader,
    s: state,
    emt: empty,
    t: table,
    c: classes,
  });

  return { node, loading: state !== "idle", load, items };
}
