import { useMemo } from "react";
import {
  updateAWSQueryData,
  useEndowmentCardsQuery,
  useLazyEndowmentCardsQuery,
} from "services/aws/aws";
import { useGetter, useSetter } from "store/accessors";

export default function useCards() {
  const dispatch = useSetter();
  const {
    sdgGroups,
    endow_types,
    endow_designation,
    sort,
    searchText,
    kyc_only,
    tiers,
    region,
  } = useGetter((state) => state.component.marketFilter);

  const selectedSDGs = useMemo(
    () => Object.entries(sdgGroups).flatMap(([, members]) => members),
    [sdgGroups]
  );

  const { activities, headquarters } = region;
  const hqCountries = useMemo(
    () =>
      encodeURI(
        Object.entries(headquarters)
          .flatMap(([, countries]) => (countries ? countries : []))
          .join(",")
      ),
    [headquarters]
  );

  const activityCountries = useMemo(
    () =>
      encodeURI(
        Object.entries(activities)
          .flatMap(([, countries]) => (countries ? countries : []))
          .join(",")
      ),
    [activities]
  );
  const designations = endow_designation.join(",");

  const { isLoading, data, isError, originalArgs } = useEndowmentCardsQuery({
    query: searchText || "matchall",
    sort: sort ? `${sort.key}+${sort.direction}` : "default",
    endow_types: endow_types.join(",") || null,
    tiers: tiers.join(",") || null,
    sdgs: selectedSDGs.join(",") || 0,
    kyc_only: kyc_only.join(",") || null,
    ...(designations ? { endow_designation: designations } : {}),
    ...(hqCountries ? { hq_country: hqCountries } : {}),
    ...(activityCountries ? { active_in_countries: activityCountries } : {}),
    page: 1, // always starts at page 1
    hits: 15,
    published: "true",
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
  let hasMore = false;
  if (data?.Page !== undefined && data?.NumOfPages !== undefined) {
    const hasMore = (data?.Page || 0) < (data?.NumOfPages || 0);
  }

  return { hasMore, isLoading, isLoadingNextPage, loadNextPage, data, isError };
}
