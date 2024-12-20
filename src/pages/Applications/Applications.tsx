import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import withAuth from "contexts/Auth";
import { Search } from "lucide-react";
import Filter from "./Filter";
import Table from "./Table";
import usePaginatedApplications from "./usePaginatedApplications";

function Applications() {
  const {
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange,
    setParams,
    isFetching,
  } = usePaginatedApplications();

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <Seo title="Applications" />
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Dashboard
      </h1>
      <div className="relative flex gap-x-3 items-center border border-gray-l4 w-full bg-white dark:bg-blue-d6 rounded">
        <Search
          size={22}
          className="text-navy-d4 dark:text-navy-l2 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={isError}
          className="p-3 pl-10 placeholder:text-navy-l1 dark:placeholder:text-navy-l2 bg-transparent w-full outline-none disabled:bg-gray-l3 dark:disabled:bg-navy-d3"
          type="text"
          placeholder="Search applications"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoadingOrError || isFetching}
        setParams={setParams}
        classes="max-lg:col-span-full max-lg:w-full"
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
export const Component = withAuth(Applications, ["ap-admin"]);
