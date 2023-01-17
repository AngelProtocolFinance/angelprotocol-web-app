import { Link } from "react-router-dom";
import { TableProps } from "./types";
import { Donation } from "types/aws";
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
      className={`${classes} w-full text-sm text-gray-d2 dark:text-white font-body border border-gray-l2 border-b-0 rounded-md dark:border-bluegray border-separate border-spacing-0 overflow-hidden`}
    >
      <TableSection type="thead" rowClass="">
        <Cells
          type="th"
          cellClass="px-3 py-4 bg-orange-l6 dark:bg-blue-d7 uppercase font-semibold text-left text-xs font-body border border-gray-l2 dark:border-bluegray border-t-0 border-l-0 last:border-r-0"
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
        rowClass="hover:bg-blue hover:bg-blue/10 even:bg-orange-l6 dark:bg-blue-d6 dark:even:bg-blue-d"
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
            <Cells
              key={hash}
              type="td"
              cellClass="p-3 border border-gray-l2 dark:border-bluegray border-t-0 border-l-0 last:border-r-0"
            >
              <Link
                to={`${appRoutes.profile}/${charityId}`}
                className="flex items-center gap-1 w-40 cursor-pointer text-sm hover:underline"
              >
                <span className="truncate">{charityName}</span>
                <Icon type="ExternalLink" className="w-5 h-5" />
              </Link>
              <>{new Date(date).toLocaleDateString()}</>
              <>{chainName}</>
              <span className="font-body text-sm">{symbol}</span>
              <>{humanize(amount, 3)}</>
              {/* <>{`$${humanize(usdValue, 2)}`}</>  usd value has error*/}
              <>--</>
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
