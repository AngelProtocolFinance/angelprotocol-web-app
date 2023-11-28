import {
  updateAWSQueryData,
  useEndowmentCardsQuery,
  useLazyEndowmentCardsQuery,
} from "services/aws/aws";
import { useGetter, useSetter } from "store/accessors";
import { isEmpty } from "helpers";

export default function useCards() {
  const dispatch = useSetter();
  const { sort, searchText, endow_designation, sdgs, kyc_only, countries } =
    useGetter((state) => state.component.marketFilter);

  const { isLoading, data, isError, originalArgs } = useEndowmentCardsQuery({
    query: searchText,
    sort: sort ? `${sort.key}+${sort.direction}` : "default",
    page: 1, // always starts at page 1
    hits: 15,
    published: "true",
    ...(isEmpty(sdgs) ? {} : { sdgs: sdgs.join(",") }),
    ...(isEmpty(kyc_only) ? {} : { kyc_only: kyc_only.join(",") }),
    ...(isEmpty(countries) ? {} : { active_in_countries: countries.join(",") }),
    ...(isEmpty(countries) ? {} : { hq_country: countries.join(",") }),
    ...(isEmpty(endow_designation)
      ? {}
      : { endow_designation: endow_designation.join(",") }),
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

  return { hasMore, isLoading, isLoadingNextPage, loadNextPage, data, isError };
}
