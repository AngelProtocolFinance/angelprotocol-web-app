import { useState } from "react";
import {
  updateBankingApplicationsQueryData,
  useBankingApplicationsQuery,
  useLazyBankingApplicationsQuery,
} from "services/aws/banking-applications";
import { useSetter } from "store/accessors";
import { BankingApplicationsQueryParams } from "types/aws";

export default function usePagination() {
  const dispatch = useSetter();

  const [query, setQuery] = useState("");

  const [params, setParams] = useState<BankingApplicationsQueryParams>({});

  const queryState = useBankingApplicationsQuery(params);

  const { isLoading, isFetching, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyBankingApplicationsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.nextPageKey &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newPageRes } = await loadMore({
        ...originalArgs,
        nextPageKey: data.nextPageKey,
      });

      if (newPageRes) {
        //pessimistic update to original cache data
        dispatch(
          updateBankingApplicationsQueryData(
            "bankingApplications",
            originalArgs,
            (prevResult) => {
              prevResult.items.push(...newPageRes.items);
              prevResult.nextPageKey = newPageRes.nextPageKey;
            },
          ),
        );
      }
    }
  }

  const hasMore = !!data?.nextPageKey;

  return {
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    isLoading,
    isFetching,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange: setQuery,
    setParams,
  };
}
