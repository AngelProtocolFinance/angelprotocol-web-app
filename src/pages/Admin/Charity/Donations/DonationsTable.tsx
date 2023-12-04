import { DonationReceivedByEndow, KYCData } from "types/aws";
import { usePaginatedDonationRecords } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../Context";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id: endowmentId } = useAdminContext();

  const { data, isLoading, isError, hasMore, loadNextPage, isLoadingNextPage } =
    usePaginatedDonationRecords({
      endowmentId: endowmentId.toString(),
    });

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;
  return (
    <div className={classes}>
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading,
          isError,
        }}
        messages={{
          loading: "Fetching donations",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => (
          <>
            <div className="grid w-full sm:flex items-center sm:justify-end mb-2 gap-2">
              <CsvExporter
                classes="border border-blue text-blue-d1 hover:border-blue-l2 hover:text-blue rounded px-4 py-2 text-sm"
                headers={csvHeadersDonations}
                data={donations}
                filename="received_donations.csv"
              >
                <Icon type="FileCSV" size={17} className="text-2xl" />
                Donation Records
              </CsvExporter>
              <CsvExporter
                classes="border border-blue text-blue-d1 hover:border-blue-l2 hover:text-blue rounded px-4 py-2 text-sm"
                headers={csvHeadersReceipts}
                data={donations
                  .filter((x) => !!x.kycData)
                  .map((x) => x.kycData!)}
                filename="receipts.csv"
              >
                <Icon type="FileCSV" size={17} className="text-2xl" />
                Donor Information
              </CsvExporter>
            </div>

            <div className="overflow-x-auto">
              <Table
                donations={donations}
                hasMore={hasMore}
                onLoadMore={loadNextPage}
                disabled={isLoadingOrError}
                isLoading={isLoadingNextPage}
              />
            </div>
          </>
        )}
      </QueryLoader>
    </div>
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
