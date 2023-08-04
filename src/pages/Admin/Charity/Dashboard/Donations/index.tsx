import { useAdminResources } from "pages/Admin/Guard";
import usePaginatedDonationRecords from "services/apes/donations/usePaginatedDonations";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function Donations({ classes = "" }: { classes?: string }) {
  const { endowmentId } = useAdminResources();

  const { data, isLoading, isError, hasMore, loadNextPage, isLoadingNextPage } =
    usePaginatedDonationRecords({
      endowmentId: endowmentId.toString(),
    });

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;
  return (
    <div className={`grid grid-rows-[auto_1fr] ${classes}`}>
      <h1 className="text-2xl font-extrabold uppercase mb-2">
        Received donations
      </h1>
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading,
          isError,
        }}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => (
          <Table
            donations={donations}
            hasMore={hasMore}
            onLoadMore={loadNextPage}
            disabled={isLoadingOrError}
            isLoading={isLoadingNextPage}
          />
        )}
      </QueryLoader>
    </div>
  );
}
