import { useSearchParams } from "react-router-dom";
import {
  updateAWSQueryData,
  useEndowmentCardsQuery,
  useLazyEndowmentCardsQuery,
} from "services/aws/aws";
import { useSetter } from "store/accessors";
import { toObj, toParsed } from "../helpers";

export default function useCards() {
  const [params] = useSearchParams();
  const parsed = toParsed(params);

  const dispatch = useSetter();
  const { query, claimed, ..._params } = parsed;

  const { isLoading, isFetching, data, isError, originalArgs } =
    useEndowmentCardsQuery(
      toObj({
        ...parsed,
        query,
        claimed: query && !claimed ? [true, false] : claimed,
        ..._params,
      })
    );

  const [loadMore, { isLoading: isLoadingNextPage }] =
    useLazyEndowmentCardsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.Page &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newEndowRes } = await loadMore({
        ...originalArgs,
        page: (data.Page + 1).toString(),
      });

      if (newEndowRes) {
        //pessimistic update to original cache data
        dispatch(
          updateAWSQueryData("endowmentCards", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.Page = newEndowRes.Page;
          })
        );
      }
    }
  }

  // initial assumption is that there's no more to load until we get first res from query
  const hasMore = (data?.Page || 0) < (data?.NumOfPages || 0);

  return {
    hasMore,
    isLoading,
    isFetching,
    isLoadingNextPage,
    loadNextPage,
    data,
    isError,
  };
}
