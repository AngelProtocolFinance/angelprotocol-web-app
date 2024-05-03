import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import usePaginatedDonationRecords from "services/aws/usePaginatedDonations";
import type { DonationRecord, KYCData } from "types/aws";
import type { Ensure } from "types/utils";
import { useAdminContext } from "../../Context";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id: endowmentId } = useAdminContext();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    hasMore,
    loadNextPage,
    isLoadingNextPage,
  } = usePaginatedDonationRecords({
    endowmentId: endowmentId.toString(),
  });

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;
  return (
    <div className={classes}>
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading,
          isFetching,
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
                  .filter(
                    (d): d is Ensure<DonationRecord, "donorDetails"> =>
                      !!d.donorDetails
                  )
                  .map<KYCData>(({ donorDetails: d }) =>
                    fill({
                      ...d.address,
                      fullName: d.fullName,
                      kycEmail: d.kycEmail,
                    })
                  )}
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
  key: keyof DonationRecord;
  label: string;
}[] = [
  { key: "viaName", label: "Source" },
  { key: "finalAmountUsd", label: "Total amount (USD)" },
  { key: "date", label: "Date" },
  { key: "id", label: "Transaction Hash" },
];

/** fill undefined with "" */
function fill<T extends object>(
  obj: T
): { [K in keyof T]-?: NonNullable<T[K]> } {
  return new Proxy(obj, {
    get(target: any, key) {
      return target[key] ?? "";
    },
  });
}

const csvHeadersReceipts: { key: keyof KYCData; label: string }[] = [
  { key: "fullName", label: "Full Name" },
  { key: "kycEmail", label: "Email" },
  { key: "line1", label: "Address line 1" },
  { key: "line2", label: "Address line 2" },
  { key: "city", label: "City" },
  { key: "zipCode", label: "Zip Code" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
];
