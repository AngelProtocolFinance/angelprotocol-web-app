import { Donation } from "types/aws";
import CsvExporter from "components/CsvExporter";
import TableSection, { Cells } from "components/TableSection";
import { HeaderButton, useSort } from "components/donations";
import { getTxUrl, humanize, maskAddress } from "helpers";

export default function Table(props: { donations: Donation[] }) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    props.donations
  );

  return (
    <table className="w-full border-collapse self-start">
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/30">
        <Cells
          type="th"
          cellClass="text-left uppercase font-heading font-semibold text-sm p-2 first:pl-0 last:pr-0"
        >
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey={"amount"}
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey={"date"}
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <CsvExporter
            classes="hover:text-angel-blue"
            headers={csvHeaders}
            data={props.donations}
            filename="received_donations.csv"
          />
          <>Receipt provided</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {sorted.map(({ hash, amount, symbol, chainId, date }) => (
          <Cells
            key={hash}
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0 text-left"
          >
            <>{humanize(amount, 3)}</>
            <span className="font-mono text-sm">{symbol}</span>
            <>{new Date(date).toLocaleDateString()}</>
            <a
              href={getTxUrl(chainId, hash)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-angel-blue cursor-pointer uppercase text-sm"
            >
              {maskAddress(hash)}
            </a>
            <>No</>
          </Cells>
        ))}
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
