import { useParams } from "react-router-dom";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import Filter from "./Filter";
import NoDonations from "./NoDonations";
import Table from "./Table";
import usePaginatedApplications from "./usePaginatedApplications";

export default function Applications() {
  const { address: donorAddress = "" } = useParams<{ address: string }>();
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
          placeholder={`Search donations...`}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoadingOrError}
        setParams={setParams}
        donorAddress={donorAddress}
        classes="max-lg:col-span-full max-lg:w-full"
      />
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading: isLoading,
          isError: isError,
        }}
        messages={{
          loading: "Loading donations...",
          error: "Failed to get donations",
          empty: <NoDonations classes="mt-8 place-self-center col-span-full" />,
        }}
      >
        {(donations) => (
          <div className="grid col-span-full">
            <Table
              donations={donations}
              classes="hidden max-lg:mt-4 lg:table"
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
