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
      Object.entries(headquarters)
        .flatMap(([, countries]) => (countries ? countries : []))
        .join(","),
    [headquarters]
  );

  const activityCountries = useMemo(
    () =>
      Object.entries(activities)
        .flatMap(([, countries]) => (countries ? countries : []))
        .join(","),
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
    start: 0,
  });

  const [loadMore, { isLoading: isLoadingNextPage }] =
    useLazyEndowmentCardsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.ItemCutoff &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newEndowRes } = await loadMore({
        ...originalArgs,
        start: data.ItemCutoff + 1,
      });

      if (newEndowRes) {
        //pessimistic update to original cache data
        dispatch(
          updateAWSQueryData("endowmentCards", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return { hasMore, isLoading, isLoadingNextPage, loadNextPage, data, isError };
}
