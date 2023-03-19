import { useMemo } from "react";
import { EndowmentCard, EndowmentProfileUpdate } from "types/aws";
import {
  updateAWSQueryData,
  useEndowmentsQuery,
  useLazyEndowmentsQuery,
} from "services/aws/aws";
import { useGetter, useSetter } from "store/accessors";

type EndowCardFields = keyof (Omit<EndowmentCard, "hq" | "categories"> &
  /** replace with cloudsearch specific field format */
  Pick<EndowmentProfileUpdate, "hq_country" | "categories_sdgs">);

const endowCardObj: {
  [key in EndowCardFields]: any; //we care only for keys
} = {
  hq_country: "",
  active_in_countries: "",
  categories_sdgs: "",
  id: "",
  image: "",
  kyc_donors_only: "",
  name: "",
  tagline: "",
  endow_type: "",
};

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

  const { isLoading, data, isError, originalArgs } = useEndowmentsQuery({
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
    limit: 15,
    templateResult: endowCardObj,
  });

  const [loadMore, { isLoading: isLoadingNextPage }] = useLazyEndowmentsQuery();

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
          updateAWSQueryData("endowments", originalArgs, (prevResult) => {
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
