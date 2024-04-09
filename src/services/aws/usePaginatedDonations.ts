import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import { useSetter } from "store/accessors";
import { DonationsQueryParams } from "types/aws";
import {
  updateAWSQueryData,
  useDonationsQuery,
  useLazyDonationsQuery,
} from "./aws";

type DonorOwner = { email: string };
type EndowmentOwner = { endowmentId: string };

type Args = DonorOwner | EndowmentOwner;

/**
 * By default loads finalized donations, unless the `status` field is
 * explicitly set to "PENDING"
 */
export default function usePaginatedDonationRecords(args: Args) {
  const dispatch = useSetter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const id: string = "endowmentId" in args ? args.endowmentId : args.email;

  const [params, setParams] = useState<DonationsQueryParams>({
    asker: id,
  });

  const queryState = useDonationsQuery(params, {
    skip: !id,
    selectFromResult({ data, ...rest }) {
      if (!data?.Items) {
        return { data, ...rest };
      }

      const filtered = data?.Items.filter(
        ({ donorDetails: _, ...flatFields }) =>
          Object.values(flatFields)
            .reduce<string>((result, val) => `${val}` + result, "")
            .toLocaleLowerCase()
            .includes(debouncedQuery.toLocaleLowerCase())
      );

      return {
        data: { Items: filtered, nextPage: data.nextPage },
        ...rest,
      };
    },
  });

  const { isLoading, isFetching, isError, error, data, originalArgs } =
    queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyDonationsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.nextPage &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newPage } = await loadMore({
        ...originalArgs,
        page: data.nextPage,
      });

      if (newPage) {
        //pessimistic update to original cache data
        dispatch(
          updateAWSQueryData("donations", originalArgs, (prevResult) => {
            prevResult.Items.push(...newPage.Items);
            prevResult.nextPage = newPage.nextPage;
          })
        );
      }
    }
  }

  const hasMore = !!data?.nextPage;

  return {
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    error: error,
    isLoading: isLoading || isDebouncing,
    isFetching,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange: setQuery,
    status: originalArgs?.status || "final",
    setStatus: (status: DonationsQueryParams["status"]) =>
      setParams((prev) => ({ ...prev, status })),
    setParams,
  };
}
