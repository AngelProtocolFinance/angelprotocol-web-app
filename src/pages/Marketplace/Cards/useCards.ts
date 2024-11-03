import { categories } from "constants/unsdgs";
import { isEmpty } from "helpers";
import useDebouncer from "hooks/useDebouncer";
import {
  updateAWSQueryData,
  useEndowmentCardsQuery,
  useLazyEndowmentCardsQuery,
} from "services/aws/aws";
import { useSetter } from "store/accessors";
import { useMarketplaceContext } from "../Context";

export default function useCards() {
  const { state } = useMarketplaceContext();
  const dispatch = useSetter();
  const { sort, searchText, sdgGroups, verified, ...params } = state;
  const [debouncedSearchText, isDebouncing] = useDebouncer(searchText, 500);

  const sdgs = sdgGroups.flatMap((g) => categories[g].sdgs);

  const _params = Object.entries(params).reduce(
    (prev, [key, val]) => ({
      ...prev,
      ...(isEmpty(val) ? {} : { [key]: val.join(",") }),
    }),
    {}
  );

  const {
    isLoading,
    isFetching,
    isUninitialized,
    data,
    isError,
    originalArgs,
  } = useEndowmentCardsQuery(
    {
      query: debouncedSearchText,
      page: "1", // always starts at page 1
      sdgs: sdgs.join(","),
      claimed:
        /** search for both verified/unverified if user didn't explicitly narrow verified status */
        searchText && isEmpty(verified) ? "true,false" : verified.join(","),
      ..._params,
    },
    { skip: isDebouncing }
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
    isLoading: isLoading || isUninitialized,
    isFetching: isFetching || isUninitialized,
    isLoadingNextPage,
    loadNextPage,
    data,
    isError,
  };
}
