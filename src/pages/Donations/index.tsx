import withAuth from "contexts/Auth";
import { usePaginatedDonationRecords } from "services/apes";
import DonationsSection from "./DonationsSection";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import Filter from "./Filter";
import { DonationMadeByDonor, DonationsQueryParams } from "types/aws";
import { useState } from "react";
import { isEmpty } from "helpers";
import QueryLoader from "components/QueryLoader";
import NoDonations from "./NoDonations";

export default withAuth(function Donations({ user }) {
  const [selectedStatus, setSelectedType] =
    useState<DonationsQueryParams["status"]>("RECEIVED");

  const queryState = usePaginatedDonationRecords({
    email: user.email,
    status: selectedStatus,
  });

  const {
    data,
    hasMore,
    isError,
    error,
    isLoading,
    isFetching,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange,
    setParams,
  } = queryState;

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-20">
      <h1 className="text-3xl max-lg:text-center max-lg:col-span-full max-lg:mb-4">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={isLoadingOrError || isEmpty(data?.Items ?? [])}
        classes="max-lg:row-start-5 max-lg:col-span-full lg:justify-self-end btn-blue px-8 py-3"
        headers={csvHeaders}
        data={data?.Items || []}
        filename="donations.csv"
      >
        Export to CSV
      </CsvExporter>
      <div className="relative flex gap-x-3 items-center border border-gray-l4 w-full bg-white dark:bg-blue-d6 rounded">
        <Icon
          type="Search"
          size={24}
          className="text-navy-d4 dark:text-navy-l2 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={isError}
          className="p-3 pl-10 placeholder:text-navy-l1 dark:placeholder:text-navy-l2 bg-transparent w-full outline-none disabled:bg-gray-l3 dark:disabled:bg-navy-d3"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoading || isLoadingNextPage}
        setParams={setParams}
        classes="max-lg:col-span-full max-lg:w-full"
      />
      <div className="grid col-span-full">
        <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <button
            onClick={() => setSelectedType("RECEIVED")}
            className={classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selectedStatus === "RECEIVED"
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )}
          >
            {"RECEIVED" satisfies DonationsQueryParams["status"]}
          </button>
          <button
            onClick={() => setSelectedType("PENDING")}
            className={classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selectedStatus === "PENDING"
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )}
          >
            {"PENDING" satisfies DonationsQueryParams["status"]}
          </button>
        </div>
        <QueryLoader
          queryState={{
            data: data?.Items,
            isLoading,
            isFetching,
            error: error,
            isError: isError,
          }}
          messages={{
            loading: "Loading donations...",
            error: "Failed to get donations",
            empty: (
              <NoDonations classes="mt-8 place-self-center col-span-full" />
            ),
          }}
        >
          {(donations) => (
            <DonationsSection
              donations={donations}
              disabled={isLoadingOrError}
              hasMore={hasMore}
              isLoading={isLoadingNextPage}
              onLoadMore={loadNextPage}
            />
          )}
        </QueryLoader>
      </div>
    </div>
  );
});

const csvHeaders: { key: keyof DonationMadeByDonor; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
