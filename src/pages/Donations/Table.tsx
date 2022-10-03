import React, { PropsWithChildren } from "react";
import { SortDirection, SortKey } from "pages/Donations/types";
import { Donation } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import TableSection, { Cells } from "components/TableSection";
import { getTxUrl, humanize } from "helpers";
import useSort from "./useSort";

export default function Table(props: {
  donations: Donation[];
  isLoading: boolean;
  isError: boolean;
}) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    props.donations
  );
  const showKYCForm = useKYC();

  const { wallet } = useGetWallet();

  if (!wallet) {
    return <Tooltip>Your wallet is not connected!!!</Tooltip>;
  }

  if (props.isLoading) {
    return <Tooltip>Loading transactions...</Tooltip>;
  }

  if (props.isError) {
    return <Tooltip>Failed to get transactions..</Tooltip>;
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
        {sorted.map(({ hash, amount, symbol, chainId, date }) => (
          <Cells key={hash} type="td" cellClass="p-2 first:pl-0 last:pr-0">
            <p className="text-base font-bold">$ {humanize(amount)}</p>
            <>{new Date(date).toLocaleDateString()}</>
            <span className="font-mono">{symbol}</span>
            <a
              href={getTxUrl(chainId, hash)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
            >
              <span className="inline-block text-base w-36 truncate">
                {chainId}
              </span>
            </a>
            <button
              className="font-heading text-sm text-white-grey bg-angel-blue hover:bg-bright-blue  shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
              onClick={() =>
                showKYCForm({
                  type: "post-donation",
                  txHash: hash,
                })
              }
            >
              get receipt
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

const headers: { key: SortKey; name: string }[] = [
  { key: "amount", name: "amount" },
  { key: "date", name: "date" },
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
