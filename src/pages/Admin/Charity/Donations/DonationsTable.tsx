import { usePaginatedDonationRecords } from "services/apes";
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
