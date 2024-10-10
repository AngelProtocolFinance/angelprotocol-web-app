import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import withAuth from "contexts/Auth";
import Filter from "./Filter";
import Table from "./Table";
import usePagination from "./usePagination";

function BankingApplications() {
  const {
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
    setParams,
    isFetching,
  } = usePagination();

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20 lg:pt-10">
      <Seo title="Banking applications" />
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Banking Applications
      </h1>

      <Filter
        isDisabled={isLoadingOrError || isFetching}
        setParams={setParams}
        classes="justify-self-end"
      />
      <QueryLoader
        queryState={{
          data: data?.items,
          isLoading,
          isFetching,
          isError: isError,
        }}
        messages={{
          loading: "Loading applications...",
          error: "Failed to get applications",
          empty: "No applications found.",
        }}
      >
        {(applications) => (
          <div className="grid col-span-full overflow-x-auto">
            <Table
              applications={applications}
              hasMore={hasMore}
              onLoadMore={loadNextPage}
              disabled={isLoadingOrError}
              isLoading={isLoadingNextPage}
            />
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

export const Component = withAuth(BankingApplications, ["ap-admin"]);
