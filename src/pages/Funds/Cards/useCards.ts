import useDebouncer from "hooks/useDebouncer";
import {
  updateAwsQueryData,
  useFundsQuery,
  useLazyFundsQuery,
} from "services/aws/funds";
import { useSetter } from "store/accessors";

export default function useCards(search: string) {
  const [debouncedSearchText, isDebouncing] = useDebouncer(search, 500);
  const dispatch = useSetter();

  const {
    isLoading,
    isFetching,
    isUninitialized,
    data,
    isError,
    originalArgs,
  } = useFundsQuery(
    { query: debouncedSearchText, page: 1 },
    { skip: isDebouncing }
  );

  const [loadMore, { isLoading: isLoadingNextPage }] = useLazyFundsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.page &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newPage } = await loadMore({
        ...originalArgs,
        page: data.page + 1,
      });

      if (newPage) {
        //pessimistic update to original cache data
        dispatch(
          updateAwsQueryData("funds", originalArgs, (prevResult) => {
            prevResult.items.push(...newPage.items);
            prevResult.page = newPage.page;
          })
        );
      }
    }
  }

  // initial assumption is that there's no more to load until we get first res from query
  const hasMore = (data?.page || 0) < (data?.numPages || 0);

  return {
    hasMore,
    isLoading: isLoading || isUninitialized,
    isLoadingNextPage: isLoadingNextPage,
    isFetching: isFetching || isUninitialized,
    loadNextPage,
    data,
    isError,
  };
}
