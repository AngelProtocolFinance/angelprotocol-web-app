import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import withAuth from "contexts/Auth";
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
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-center text-3xl max-lg:font-work col-span-full max-lg:mb-4">
        Applications Review - Dashboard
      </h1>
      <div className="relative flex gap-x-3 items-center border border-prim w-full bg-white dark:bg-blue-d6 rounded">
        <Icon
          type="Search"
          size={24}
          className="text-gray-d2 dark:text-gray absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={isError}
          className="p-3 pl-10 placeholder:text-gray-d1 dark:placeholder:text-gray bg-transparent w-full outline-none disabled:bg-gray-l3 dark:disabled:bg-bluegray-d1"
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
          data: data?.Items,
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
export default withAuth(Applications, ["ap-admin"]);
