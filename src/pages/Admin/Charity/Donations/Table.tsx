import { DonationReceivedByEndow, KYCData } from "types/aws";
import CsvExporter from "components/CsvExporter";
import ExtLink from "components/ExtLink";
import { HeaderButton } from "components/HeaderButton";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import useSort from "hooks/useSort";
import { getTxUrl, humanize, maskAddress } from "helpers";

type Props = {
  donations: DonationReceivedByEndow[];
  classes?: string;
  onLoadMore(): void;
  hasMore: boolean;
  disabled: boolean;
  isLoading: boolean;
};

export default function Table({
  donations,
  hasMore,
  onLoadMore,
  isLoading,
  disabled,
}: Props) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    donations,
    "date"
  );

  return (
    <>
      <CsvExporter
        classes="hover:text-blue mb-5"
        headers={csvHeadersDonations}
        data={donations}
        filename="received_donations.csv"
      >
        Save Donation Records to CSV{" "}
        <Icon type="FileDownload" className="text-2xl" />
      </CsvExporter>
      <CsvExporter
        classes="hover:text-blue mb-5"
        headers={csvHeadersReceipts}
        data={donations.filter((x) => !!x.kycData).map((x) => x.kycData!)}
        filename="receipts.csv"
      >
        Save Donor Information to CSV
        <Icon type="FileDownload" className="text-2xl" />
      </CsvExporter>
      <table className="w-full text-sm rounded border border-separate border-spacing-0 border-prim overflow-x-auto">
        <TableSection
          type="thead"
          rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
        >
          <Cells
            type="th"
            cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
          >
            <HeaderButton
              onClick={handleHeaderClick("amount")}
              _activeSortKey={sortKey}
              _sortKey="amount"
              _sortDirection={sortDirection}
            >
              Amount
            </HeaderButton>
            <HeaderButton
              onClick={handleHeaderClick("symbol")}
              _activeSortKey={sortKey}
              _sortKey="symbol"
              _sortDirection={sortDirection}
            >
              Currency
            </HeaderButton>
            <HeaderButton
              onClick={handleHeaderClick("date")}
              _activeSortKey={sortKey}
              _sortKey="date"
              _sortDirection={sortDirection}
            >
              Date
            </HeaderButton>
            <>Transaction</>
            <>Receipt provided</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
          selectedClass="bg-orange-l5 dark:bg-blue-d4"
        >
          {sorted
            .map(({ hash, amount, symbol, chainId, date, kycData }) => (
              <Cells
                key={hash}
                type="td"
                cellClass={`p-3 border-t border-prim max-w-[256px] truncate ${
                  hasMore ? "" : "first:rounded-bl last:rounded-br"
                }`}
              >
                <>{humanize(amount, 3)}</>
                <span className="text-sm">{symbol}</span>
                <span className="text-sm">
                  {new Date(date).toLocaleDateString()}
                </span>
                <ExtLink
                  //default to ethereum for staging
                  href={getTxUrl(chainId === "staging" ? "1" : chainId, hash)}
                  className="text-center text-blue hover:text-blue-l2 cursor-pointer uppercase text-sm"
                >
                  {maskAddress(hash)}
                </ExtLink>
                {!kycData ? (
                  <Icon type="CloseCircle" className="text-2xl text-red-400" />
                ) : (
                  <Icon
                    type="CheckCircle"
                    className="text-2xl text-green-400"
                  />
                )}
              </Cells>
            ))
            .concat(
              hasMore ? (
                <td
                  colSpan={9}
                  key="load-more-btn"
                  className="border-t border-prim rounded-b"
                >
                  <button
                    type="button"
                    onClick={onLoadMore}
                    disabled={disabled}
                    className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 enabled:hover:bg-orange-l5 enabled:dark:hover:bg-blue-d3 active:bg-orange-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 aria-disabled:dark:bg-bluegray disabled:dark:bg-bluegray"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </button>
                </td>
              ) : (
                []
              )
            )}
        </TableSection>
      </table>
    </>
  );
}

const csvHeadersDonations: {
  key: keyof DonationReceivedByEndow;
  label: string;
}[] = [
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
