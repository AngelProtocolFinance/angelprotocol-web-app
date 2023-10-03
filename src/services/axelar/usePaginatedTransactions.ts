import { useSetter } from "store/accessors";
import {
  updateQueryData,
  useLazyTransactionsQuery,
  useTransactionsQuery,
} from "./index";

export default function usePaginatedTransactions() {
  const dispatch = useSetter();

  const queryState = useTransactionsQuery({ page: 1 });

  const { isLoading, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyTransactionsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.items &&
      data.next &&
      originalArgs /** rows won't even show if no initial query is made */
    ) {
      const { data: transactions } = await loadMore({
        ...originalArgs,
        page: data.next,
      });

      if (transactions) {
        //pessimistic update to original cache data
        dispatch(
          updateQueryData("transactions", originalArgs, (prevResult) => {
            prevResult.items.push(...transactions.items);
            prevResult.next = transactions.next;
          })
        );
      }
    }
  }

  return {
    items: data?.items ?? [],
    hasMore: !!data?.next,
    isError: isError || isErrorNextPage,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
  };
}
