import {
  updateDonationsApiQueryData,
  useBalanceTxsQuery,
  useLazyBalanceTxsQuery,
} from "services/apes";

import { useSetter } from "store/accessors";

export default function usePagination(endowId: number) {
  const dispatch = useSetter();
  const queryState = useBalanceTxsQuery({ endowId });
  const { isLoading, isFetching, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyBalanceTxsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.nextPageKey &&
      originalArgs /** items won't even show if no initial query is made */
    ) {
      const { data: newPageRes } = await loadMore({
        ...originalArgs,
        nextPageKey: data.nextPageKey,
      });

      if (newPageRes) {
        //pessimistic update to original cache data
        dispatch(
          updateDonationsApiQueryData(
            "balanceTxs",
            originalArgs,
            (prevResult) => {
              prevResult.items.push(...newPageRes.items);
              prevResult.nextPageKey = newPageRes.nextPageKey;
            }
          )
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
    loadNextPage,
  };
}
