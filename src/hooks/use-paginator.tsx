import { useFetcher } from "@remix-run/react";
import { Info } from "components/status";
import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import type { IPaginator } from "types/components";

interface Page<T> {
  items: T[];
  next?: string;
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
}: Props<I>): { loading: boolean; node: ReactNode } {
  const { state, data, load } = useFetcher<Page<I>>({ key: id });
  const [items, set_items] = useState<I[]>(page1.items);

  useEffect(() => {
    set_items(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (state !== "idle" || !data) return;
    set_items((prev) => [...prev, ...(data as Page<I>).items]);
  }, [state, data]);

  const next = data ? (data as Page<I>).next : page1.next;
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

  return { node, loading: state === "loading" };
}
