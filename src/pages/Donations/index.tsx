import { useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, DonationsQueryParams } from "types/aws";
import {
  updateDonationsQueryData,
  useDonationsQuery,
  useLazyDonationsQuery,
} from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import QueryLoader from "components/QueryLoader";
import { useSetter } from "store/accessors";
import useDebouncer from "hooks/useDebouncer";
import { isEmpty } from "helpers";
import Filter from "./Filter";
import MobileTable from "./MobileTable";
import NoDonations from "./NoDonations";
import Table from "./Table";

export default function Donations() {
  const { address } = useParams<{ address: string }>();

  const dispatch = useSetter();

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const [params, setParams] = useState<DonationsQueryParams>({
    id: address || "",
  });

  const queryState = useDonationsQuery(params, {
    skip: !address,
    selectFromResult({ data, ...rest }) {
      if (!data?.Items) {
        return { data, ...rest };
      }

      const filtered = data?.Items.filter(({ kycData, ...flatFields }) =>
        Object.values(flatFields)
          .reduce<string>((result, val) => `${val}` + result, "")
          .toLocaleLowerCase()
          .includes(debouncedQuery.toLocaleLowerCase())
      );

      return {
        data: { Items: filtered, ItemCutoff: data.ItemCutoff },
        ...rest,
      };
    },
  });

  const { isLoading, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage }] = useLazyDonationsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.ItemCutoff &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newEndowRes } = await loadMore({
        ...originalArgs,
        start: data.ItemCutoff + 1,
      });

      if (newEndowRes) {
        //pessimistic update to original cache data
        dispatch(
          updateDonationsQueryData("donations", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-3xl font-bold max-lg:font-work max-lg:text-center max-lg:col-span-full max-lg:mb-4">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={
          isLoading ||
          isLoadingNextPage ||
          isError ||
          isDebouncing ||
          !data?.Items ||
          isEmpty(data.Items)
        }
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
          className="p-3 pl-10 placeholder:text-gray-d1 dark:placeholder:text-gray bg-transparent w-full outline-none disabled:bg-gray-l2 dark:disabled:bg-bluegray-d1"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoading || isLoadingNextPage || isError || isDebouncing}
        setParams={setParams}
        donorAddress={address || ""}
        classes="max-lg:col-span-full max-lg:w-full"
      />
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading: isLoading || isDebouncing,
          isError,
        }}
        messages={{
          loading: "Loading donations..",
          error: "Failed to get donations",
          empty: <NoDonations classes="mt-8 place-self-center col-span-full" />,
        }}
      >
        {(donations) => (
          <div className="grid col-span-full">
            <Table
              donations={donations}
              classes="hidden max-lg:mt-4 lg:table"
            />
            <MobileTable
              donations={donations}
              classes="lg:hidden max-lg:mt-4"
            />
            <button
              type="button"
              onClick={loadNextPage}
              disabled={isLoading || isLoadingNextPage || isError || !hasMore}
              className="flex items-center justify-center gap-3 uppercase text-sm font-bold border-x border-b border-prim rounded-b h-12 mb-4 hover:bg-orange-l5 dark:hover:bg-blue-d3 active:bg-orange-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 aria-disabled:dark:bg-bluegray disabled:dark:bg-bluegray"
            >
              {!isLoadingNextPage ? (
                <>
                  <LoaderRing thickness={10} classes="w-6" />
                  <p className="text-center">Loading...</p>
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
