import { Link } from "react-router-dom";
import { TableProps } from "./types";
import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import TableSection, { Cells } from "components/TableSection";
import useSort from "hooks/useSort";
import { getTxUrl, humanize, maskAddress } from "helpers";
import { appRoutes } from "constants/routes";

export default function Table({ donations, classes = "" }: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } =
    useSort(donations);

  const showKYCForm = useKYC();

  return (
    <table
      className={`${classes} w-full text-sm rounded outline outline-gray-l2 dark:outline-bluegray`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 rounded divide-x border-b divide-gray-l2 dark:divide-bluegray border-gray-l2 dark:border-bluegray"
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
          <span className="flex justify-center">Receipt</span>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:even:bg-blue-d7 divide-x divide-gray-l2 dark:divide-bluegray border-b last:border-b-0 border-gray-l2 dark:border-bluegray"
      >
        {sorted.map(
          ({
            hash,
            amount,
            symbol,
            chainId,
            date,
            chainName,
            charityName,
            usdValue,
            id: charityId,
          }) => (
            <Cells key={hash} type="td" cellClass="p-3">
              <Link
                to={`${appRoutes.profile}/${charityId}`}
                className="flex items-center justify-between gap-1 cursor-pointer text-sm hover:underline"
              >
                <span className="truncate max-w-[12rem]">{charityName}</span>
                <Icon type="ExternalLink" className="w-5 h-5" />
              </Link>
              <>{new Date(date).toLocaleDateString()}</>
              <>{chainName}</>
              <span className="font-body text-sm">{symbol}</span>
              <>{humanize(amount, 3)}</>
              <>{`$${humanize(usdValue, 2)}`}</>
              <ExtLink
                href={getTxUrl(chainId, hash)}
                className="text-center text-angel-blue cursor-pointer uppercase text-sm"
              >
                {maskAddress(hash)}
              </ExtLink>
              <button
                className="w-full flex justify-center"
                onClick={() =>
                  showKYCForm({
                    type: "post-donation",
                    txHash: hash,
                    classes: "grid gap-5",
                  })
                }
              >
                <Icon type="FatArrowDownload" className="text-2xl" />
              </button>
            </Cells>
          )
        )}
      </TableSection>
    </table>
  );
}
