import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { replaceWithEmptyString as fill, paymentMethod } from "helpers";
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
                headers={csvHeaders}
                data={donations
                  .filter(
                    (d): d is Ensure<DonationRecord, "donorDetails"> =>
                      !!d.donorDetails
                  )
                  .map<DonationRecord | KYCData>(
                    ({ donorDetails: donor, ...d }) => {
                      const amt = amount(d.splitLiqPct, d.finalAmountUsd);
                      return fill({
                        date: new Date(d.date).toLocaleDateString(),
                        appUsed:
                          d.appUsed === "bg-widget"
                            ? "Donation Form"
                            : "Marketplace",
                        paymentMethod: paymentMethod(d.paymentMethod),
                        isRecurring: d.isRecurring ? "Yes" : "No",
                        symbol: d.symbol,
                        initAmount: d.initAmount,
                        finalAmountUsd: d.finalAmountUsd,
                        directDonateAmount: amt.directDonate,
                        sfDonateAmount: amt.sfDonate,
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
                <Icon type="FileCSV" size={17} className="text-2xl" />
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
  key: keyof DonationRecord | keyof KYCData | "receipt";
  label: string;
}[] = [
  { key: "date", label: "Datetime" },
  { key: "appUsed", label: "Donation Origin" },
  { key: "paymentMethod", label: "Donation Type" },
  { key: "isRecurring", label: "Recurring Donation" },
  { key: "symbol", label: "Donation Asset" },
  { key: "initAmount", label: "Donation Amount" },
  { key: "finalAmountUsd", label: "Donation Value USD" },
  { key: "directDonateAmount", label: "Direct Donation" },
  { key: "sfDonateAmount", label: "Donation to Sustainability Fund" },
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

/** compute for direct and SF donation amounts */
function amount(splitLiqPct: number, amount = 0) {
  const directDonate = amount * (splitLiqPct / 100);
  const sfDonate = amount - directDonate;
  return { directDonate, sfDonate };
}
