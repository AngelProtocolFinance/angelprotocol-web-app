import { appRoutes } from "@giving/constants/routes";
import { getTxUrl, humanize, maskAddress } from "@giving/helpers";
import { Link } from "react-router-dom";
import { TableProps } from "./types";
import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import TableSection, { Cells } from "components/TableSection";
import useSort from "hooks/useSort";

export default function Table({ donations, classes = "" }: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } =
    useSort(donations);

  const showKYCForm = useKYC();

  return (
    <table
      className={`${classes} w-full text-sm rounded outline outline-gray-l3 dark:outline-bluegray`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 rounded divide-x border-b divide-prim border-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left"
        >
          <HeaderButton
            onClick={handleHeaderClick("charityName")}
            _activeSortKey={sortKey}
            _sortKey="charityName"
            _sortDirection={sortDirection}
          >
            Recipient
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey="date"
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("chainName")}
            _activeSortKey={sortKey}
            _sortKey="chainName"
            _sortDirection={sortDirection}
          >
            Network
          </HeaderButton>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("usdValue")}
            _activeSortKey={sortKey}
            _sortKey="usdValue"
            _sortDirection={sortDirection}
          >
            USD Value
          </HeaderButton>
          <>TX Hash</>
          <span className="flex justify-center">Status</span>
          <span className="flex justify-center">Receipt</span>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:even:bg-blue-d7 divide-x divide-prim border-b last:border-b-0 border-prim"
      >
        {sorted.map((row) => (
          <Cells key={row.hash} type="td" cellClass="p-3">
            <Link
              to={`${appRoutes.profile}/${row.id}`}
              className="flex items-center justify-between gap-1 cursor-pointer text-sm hover:underline"
            >
              <span className="truncate max-w-[12rem]">{row.charityName}</span>
              <Icon type="ExternalLink" className="w-5 h-5" />
            </Link>
            <>{new Date(row.date).toLocaleDateString()}</>
            <>{row.chainName}</>
            <span className="font-body text-sm">{row.symbol}</span>
            <>{humanize(row.amount, 3)}</>
            <>{`$${humanize(row.usdValue, 2)}`}</>
            <ExtLink
              href={getTxUrl(row.chainId, row.hash)}
              className="text-center text-angel-blue cursor-pointer uppercase text-sm"
            >
              {maskAddress(row.hash)}
            </ExtLink>
            <div className="text-center text-white">
              <span
                className={`${
                  row.donationFinalized ? "bg-green" : "bg-gray-d1 dark:bg-gray"
                } font-body px-2 py-0.5 rounded`}
              >
                {row.donationFinalized ? "RECEIVED" : "PENDING"}
              </span>
            </div>
            <button
              className="w-full flex justify-center"
              onClick={() =>
                showKYCForm({
                  type: "post-donation",
                  txHash: row.hash,
                  classes: "grid gap-5",
                })
              }
            >
              <Icon type="FatArrowDownload" className="text-2xl" />
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
