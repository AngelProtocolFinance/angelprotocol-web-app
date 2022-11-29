import { Donation, KYCData } from "types/aws";
import CsvExporter from "components/CsvExporter";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { HeaderButton, useSort } from "components/donations";
import { getTxUrl, humanize, maskAddress } from "helpers";

export default function Table(props: { donations: Donation[] }) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    props.donations
  );

  return (
    <table className="w-full border-collapse self-start">
      <TableSection
        type="thead"
        rowClass="border-b-2 border-gray-l2 dark:border-bluegray"
      >
        <Cells
          type="th"
          cellClass="text-left uppercase font-heading font-semibold text-sm p-2 first:pl-0 last:pr-0"
        >
          <HeaderButton
            onClick={handleHeaderClick("amount")}
            _activeSortKey={sortKey}
            _sortKey="amount"
            _sortDirection={sortDirection}
          >
            Amount
          </HeaderButton>
          <>Currency</>
          <HeaderButton
            onClick={handleHeaderClick("date")}
            _activeSortKey={sortKey}
            _sortKey="date"
            _sortDirection={sortDirection}
          >
            Date
          </HeaderButton>
          <CsvExporter
            classes="hover:text-blue"
            headers={csvHeadersDonations}
            data={props.donations}
            filename="received_donations.csv"
          >
            Save to CSV <Icon type="FileDownload" className="text-2xl" />
          </CsvExporter>
          <CsvExporter
            classes="hover:text-blue"
            headers={csvHeadersReceipts}
            data={props.donations
              .filter((x) => !!x.kycData)
              .map((x) => x.kycData!)}
            filename="receipts.csv"
          >
            Receipt provided <Icon type="FileDownload" className="text-2xl" />
          </CsvExporter>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-gray-l2 dark:border-bluegray hover:bg-blue-l4 hover:dark:bg-blue-d4"
      >
        {sorted.map(({ hash, amount, symbol, chainId, date, kycData }) => (
          <Cells key={hash} type="td" cellClass="p-2 first:pl-0 last:pr-0">
            <>{humanize(amount, 3)}</>
            <span className="font-mono text-sm">{symbol}</span>
            <>{new Date(date).toLocaleDateString()}</>
            <ExtLink
              href={getTxUrl(chainId, hash)}
              className="text-center text-blue cursor-pointer uppercase text-sm"
            >
              {maskAddress(hash)}
            </ExtLink>
            {!kycData ? (
              <Icon type="CloseCircle" className="text-2xl text-red-400" />
            ) : (
              <Icon type="CheckCircle" className="text-2xl text-green-400" />
            )}
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

const csvHeadersDonations: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];

const csvHeadersReceipts: { key: keyof KYCData; label: string }[] = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "consent_marketing", label: "Consented to Marketing" },
  { key: "consent_tax", label: "Consented to tax" },
  { key: "streetAddress", label: "Street Address" },
  { key: "city", label: "City" },
  { key: "zipCode", label: "Zip Code" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
];
