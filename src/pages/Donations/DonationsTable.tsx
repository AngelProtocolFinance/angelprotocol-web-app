import React, { PropsWithChildren } from "react";
import { Transaction } from "types/server/aws";
import { SortDirection, SortKey } from "pages/Donations/types";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import getTxUrl from "helpers/getTxUrl";
import toCurrency from "helpers/toCurrency";
import useDonor from "./useDonor";
import useSortTransactions from "./useSortTransactions";

export default function DonationsTable(props: {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
}) {
  const { handleHeaderClick, sortedTransactions, sortDirection, sortKey } =
    useSortTransactions(props.transactions);
  const showDonor = useDonor();

  if (props.isLoading) {
    return <Tooltip>loading transactions..</Tooltip>;
  }

  if (props.isError) {
    return <Tooltip>failed to get transactions..</Tooltip>;
  }

  if (!props.isError && !props.isLoading && props.transactions.length === 0) {
    return (
      <Tooltip classes="mt-10">You have not made any donations yet!!!</Tooltip>
    );
  }

  return (
    <table className="w-full text-white/80 border-collapse">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="px-2 first:pl-0 last:pr-0">
          {headers.map((header) => (
            <HeaderButton
              key={header.key}
              onClick={handleHeaderClick(header.key)}
              _activeSortKey={sortKey}
              _sortKey={header.key}
              _sortDirection={sortDirection}
            >
              {header.name}
            </HeaderButton>
          ))}
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {sortedTransactions.map((tx) => (
          <Cells key={tx.tx_id} type="td" cellClass="p-2 first:pl-0 last:pr-0">
            <p className="text-base font-bold">$ {toCurrency(tx.ust_amount)}</p>
            <>{tx.block_timestamp.substring(0, 10)}</>
            <span className="font-mono">{tx.name}</span>
            <a
              href={getTxUrl(tx.chain_id!, tx.tx_id)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
            >
              <span className="inline-block text-base w-36 truncate">
                {tx.tx_id}
              </span>
            </a>
            <button
              className="font-heading text-sm text-white-grey bg-angel-blue hover:bg-bright-blue  shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
              onClick={() => showDonor(tx.tx_id)}
            >
              Update
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

const headers: { key: SortKey; name: string }[] = [
  { key: "ust_amount", name: "amount" },
  { key: "block_timestamp", name: "date" },
  { key: "name", name: "Charity" },
  { key: "tx_id", name: "transaction hash" },
];

function Tooltip(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`text-white font-mono text-sm text-center ${
        props.classes ?? ""
      }`}
    >
      {props.children}
    </p>
  );
}

function HeaderButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _sortDirection: SortDirection;
    _sortKey: SortKey;
    _activeSortKey: SortKey;
  }
) {
  const { _activeSortKey, _sortKey, _sortDirection, children, ...restProps } =
    props;
  return (
    <button
      {...restProps}
      className="w-full flex items-center justify-start gap-1 uppercase font-heading font-semibold text-sm text-white/100"
    >
      <span>{children}</span>
      {_activeSortKey === _sortKey &&
        (_sortDirection === "asc" ? <Icon type="Up" /> : <Icon type="Down" />)}
    </button>
  );
}
