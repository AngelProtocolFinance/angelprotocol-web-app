import { categories } from "constants/unsdgs";
import { isEmpty } from "helpers";
import {
  updateAWSQueryData,
  useEndowmentCardsQuery,
  useLazyEndowmentCardsQuery,
} from "services/aws/aws";
import { useGetter, useSetter } from "store/accessors";

export default function useCards() {
  const dispatch = useSetter();
  const { sort, searchText, sdgGroups, ...params } = useGetter(
    (state) => state.component.marketFilter
  );

  const sdgs = sdgGroups.flatMap((g) => categories[g].sdgs);

  const _params = Object.entries(params).reduce(
    (prev, [key, val]) => ({
      ...prev,
      ...(isEmpty(val) ? {} : { [key]: val.join(",") }),
    }),
    {}
  );

  const { isLoading, isFetching, data, isError, originalArgs } =
    useEndowmentCardsQuery({
      query: searchText,
      sort: sort ? `${sort.key}+${sort.direction}` : undefined,
      page: 1, // always starts at page 1
      published: "true",
      sdgs: sdgs.join(","),
      ..._params,
    });

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
        page: data.Page + 1,
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
