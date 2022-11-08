import { Link } from "react-router-dom";
import { Donation } from "types/aws";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import TableSection, { Cells } from "components/TableSection";
import { HeaderButton, useSort } from "components/donations";
import { getTxUrl, humanize, maskAddress } from "helpers";
import { appRoutes } from "constants/routes";

export default function Table(props: { donations: Donation[] }) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    props.donations
  );
  const showKYCForm = useKYC();

  return (
    <table className="w-full text-white/80 border-collapse self-start">
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/30">
        <Cells
          type="th"
          cellClass="text-left uppercase font-heading font-semibold text-sm text-white p-2 first:pl-0 last:pr-0"
        >
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
            onClick={handleHeaderClick("charityName")}
            _activeSortKey={sortKey}
            _sortKey="charityName"
            _sortDirection={sortDirection}
          >
            Recipient
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey="date"
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <>Hash</>
          <CsvExporter
            classes="hover:text-blue"
            headers={csvHeaders}
            data={props.donations}
            filename="donations.csv"
          />
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-blue hover:bg-blue/10"
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
            id: charityId,
          }) => (
            <Cells
              key={hash}
              type="td"
              cellClass="p-2 first:pl-0 last:pr-0 text-left"
            >
              <>{chainName}</>
              <span className="font-mono text-sm">{symbol}</span>
              <Link
                to={`${appRoutes.profile}/${charityId}`}
                className="flex items-center gap-1 w-40 cursor-pointer text-sm hover:underline"
              >
                <span className="truncate">{charityName}</span>
                <Icon type="ExternalLink" className="w-5 h-5" />
              </Link>
              <>{humanize(amount, 3)}</>
              <>{new Date(date).toLocaleDateString()}</>
              <a
                href={getTxUrl(chainId, hash)}
                target="_blank"
                rel="noreferrer noopener"
                className="text-center text-angel-blue cursor-pointer uppercase text-sm"
              >
                {maskAddress(hash)}
              </a>
              <button
                className="font-heading text-sm text-white-grey hover:text-bright-blue disabled:text-gray-400 disabled:cursor-default uppercase"
                onClick={() =>
                  showKYCForm({
                    type: "post-donation",
                    txHash: hash,
                    classes: "grid gap-5",
                  })
                }
              >
                get receipt
              </button>
            </Cells>
          )
        )}
      </TableSection>
    </table>
  );
}
const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
