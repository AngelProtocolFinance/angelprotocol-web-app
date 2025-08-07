import { useFetcher } from "@remix-run/react";
import { Info } from "components/status";
import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
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
  page1: Page<T>;
  Table: FunctionComponent<IPaginator<T>>;
  Empty?: FunctionComponent<{ classes?: string }>;
  classes?: string;
  gen_loader: (loader_fn: (href: string) => void, next: string) => () => void;
}

export function use_paginator<I>({
  Table,
  Empty,
  page1,
  classes = "",
  gen_loader,
  id,
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
  const node = (({ Empty, ...x }): ReactNode => {
    if (x.items.length === 0 && Empty) {
      return <Empty classes={x.classes} />;
    }
    if (x.items.length === 0) {
      return <Info classes={x.classes}>No records found</Info>;
    }
    return (
      <Table
        {...x}
        items={x.items}
        load_next={x.next ? x.gen_loader(x.load, x.next) : undefined}
        disabled={x.state !== "idle"}
        loading={x.state === "loading"}
      />
    );
  })({ items, next, classes, load, gen_loader, Empty, state });

  return { node, loading: state === "loading", load };
}
