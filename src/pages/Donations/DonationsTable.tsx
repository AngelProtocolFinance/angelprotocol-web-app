import React, { PropsWithChildren } from "react";
import TableSection, { Cells } from "components/TableSection/TableSection";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import useSortTransactions, {
  SortDirection,
  SortKey,
} from "./useSortTransactions";
import useDonor from "./useDonor";
import { Transaction } from "services/aws/endowment_admin/types";
import Icon from "components/Icons/Icons";

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
          <Cells
            key={tx.sort_key}
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0"
          >
            <p className="text-base font-bold">$ {toCurrency(tx.amount)}</p>
            <>{tx.transaction_date.substring(0, 10)}</>
            <span className="font-mono">
              {maskAddress(tx.endowment_address)}
            </span>
            <button
              className="font-heading text-sm text-white-grey bg-angel-blue hover:bg-bright-blue  shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
              onClick={() => showDonor(tx.sort_key)}
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
  { key: "amount", name: "amount" },
  { key: "transaction_date", name: "date" },
  { key: "endowment_address", name: "endowment" },
];

function Tooltip(props: PropsWithChildren<{}>) {
  return <p className="text-white font-mono text-sm">{props.children}</p>;
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
