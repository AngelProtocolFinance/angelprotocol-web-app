import { use_paginator } from "hooks/use-paginator";
import type { IBalanceTxsPage } from "lib/balance-txs";
import { useSearchParams } from "react-router";
import { Table } from "./table";

interface Props {
  page1: IBalanceTxsPage;
  classes?: string;
}

export function Txs({ classes = "", page1 }: Props) {
  const [search] = useSearchParams();
  const { node } = use_paginator({
    table: (x) => <Table {...x} />,
    page1: page1,
    gen_loader: (load, next) => () => {
      const p = new URLSearchParams(search);
      if (next) p.set("next", next);
      load(`?${p.toString()}`);
    },
  });
  return (
    <div className={`${classes} grid content-start`}>
      <h4 className="text-lg mb-2">Transactions</h4>
      {node}
    </div>
  );
}
