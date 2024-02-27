import CsvExporter from "components/CsvExporter"
import Icon from "components/Icon"
import QueryLoader from "components/QueryLoader"
import { isEmpty } from "helpers"
import { usePaginatedDonationRecords } from "services/apes"
import { DonationMadeByDonor } from "types/aws"
import Filter from "./Filter"
import MobileTable from "./MobileTable"
import NoDonations from "./NoDonations"
import Table from "./Table"

export default function DonationsSection(
  props: ReturnType<typeof usePaginatedDonationRecords<{ email: string }>> & {
    title: string
  }
) {
  const {
    data,
    hasMore,
    isError,
    error,
    isLoading,
    isFetching,
    isLoadingNextPage,
    query,
    title,
    loadNextPage,
    onQueryChange,
    setParams,
  } = props

  const isLoadingOrError = isLoading || isLoadingNextPage || isError

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container">
      <h1 className="text-3xl max-lg:text-center max-lg:col-span-full max-lg:mb-4">
        {title}
      </h1>
      <CsvExporter
        aria-disabled={isLoadingOrError || !data?.Items || isEmpty(data.Items)}
        classes="max-lg:row-start-5 max-lg:col-span-full lg:justify-self-end btn-orange px-8 py-3"
        headers={csvHeaders}
        data={data?.Items || []}
        filename="donations.csv"
      >
        Export to CSV
      </CsvExporter>
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
          placeholder="Search donations..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoadingOrError}
        setParams={setParams}
        classes="max-lg:col-span-full max-lg:w-full"
      />
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
            <MobileTable
              donations={donations}
              classes="lg:hidden max-lg:my-4"
              hasMore={hasMore}
              onLoadMore={loadNextPage}
              disabled={isLoadingOrError}
              isLoading={isLoadingNextPage}
            />
          </div>
        )}
      </QueryLoader>
    </div>
  )
}

const csvHeaders: { key: keyof DonationMadeByDonor; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
]
