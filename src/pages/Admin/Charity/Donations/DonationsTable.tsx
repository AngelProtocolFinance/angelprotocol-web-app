import CsvExporter from "components/CsvExporter";
import QueryLoader from "components/QueryLoader";
import { replaceWithEmptyString as fill, humanize } from "helpers";
import { FileSpreadsheet } from "lucide-react";
import usePaginatedDonationRecords from "services/aws/usePaginatedDonations";
import type { Donation } from "types/aws";
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
                headers={csvHeaders}
                data={donations
                  .filter(
                    (d): d is Ensure<Donation.Record, "donorDetails"> =>
                      !!d.donorDetails
                  )
                  .map<Donation.Record | Donation.KYC>(
                    ({ donorDetails: donor, ...d }) => {
                      return fill({
                        date: new Date(d.date).toLocaleDateString(),
                        programName: d.programName,
                        appUsed:
                          d.appUsed === "bg-widget"
                            ? "Donation Form"
                            : "Marketplace",
                        paymentMethod: d.paymentMethod,
                        isRecurring: d.isRecurring ? "Yes" : "No",
                        symbol: d.symbol,
                        initAmount: humanize(d.initAmount, 2),
                        finalAmountUsd: humanize(d.finalAmountUsd ?? 0, 2),
                        id: d.id,
                        receipt: donor.address?.country ? "Yes" : "No",
                        fullName: donor.fullName,
                        kycEmail: donor.kycEmail,
                        ...donor.address,
                      });
                    }
                  )}
                filename="received_donations.csv"
              >
                <FileSpreadsheet size={17} className="text-2xl" />
                Donation Records
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

const csvHeaders: {
  key: keyof Donation.Record | keyof Donation.KYC | "receipt";
  label: string;
}[] = [
  { key: "date", label: "Datetime" },
  { key: "programName", label: "Program" },
  { key: "appUsed", label: "Donation Origin" },
  { key: "paymentMethod", label: "Donation Type" },
  { key: "isRecurring", label: "Recurring Donation" },
  { key: "symbol", label: "Donation Asset" },
  { key: "initAmount", label: "Donation Amount" },
  { key: "finalAmountUsd", label: "Donation Value USD" },
  { key: "id", label: "Transaction Hash" },
  { key: "receipt", label: "Receipt Provided" },
  { key: "fullName", label: "Full Name" },
  { key: "kycEmail", label: "Email" },
  { key: "line1", label: "Address Line 1" },
  { key: "line2", label: "Address Line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
  { key: "country", label: "Country" },
];
