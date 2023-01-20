import { useMemo } from "react";
import {
  updateAWSQueryData,
  useLazyProfilesQuery,
  useProfilesQuery,
} from "services/aws/aws";
import { QueryLoader } from "components/admin";
import { useGetter, useSetter } from "store/accessors";
import Card from "./Card";

export default function Cards({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const { sdgGroups, endow_types, sort, searchText, kyc_only, tiers } =
    useGetter((state) => state.component.marketFilter);

  const selectedSDGs = useMemo(
    () => Object.entries(sdgGroups).flatMap(([, members]) => members),
    [sdgGroups]
  );

  const { isLoading, data, isError, originalArgs } = useProfilesQuery({
    query: searchText || "matchall",
    sort: sort ? `${sort.key}+${sort.direction}` : "default",
    endow_types: endow_types.join(",") || null,
    tiers: tiers.join(",") || null,
    sdgs: selectedSDGs.join(",") || 0,
    kyc_only: kyc_only.join(",") || null,
    start: 0,
  });

  const [loadMore, { isLoading: isLoadingNextPage }] = useLazyProfilesQuery();

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
          updateAWSQueryData("profiles", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return (
    <QueryLoader
      queryState={{
        data: data?.Items,
        isLoading: isLoading,
        isError,
      }}
      messages={{
        error: "Failed to get endowments",
        loading: "Getting endowments..",
        empty: "No endowments found",
      }}
      classes={{
        container: `${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div
          className={`${classes} w-full grid ${
            endowments.length < 3
              ? "grid-cols-[repeat(auto-fill,minmax(255px,1fr))]"
              : "grid-cols-[repeat(auto-fit,minmax(245px,1fr))]"
          } gap-4 content-start`}
        >
          {endowments.map((endow) => (
            <Card {...endow} key={endow.id} />
          ))}

          {hasMore && (
            <button
              className="col-span-full btn-orange rounded-md p-2 text-sm w-full mt-6"
              onClick={loadNextPage}
              disabled={isLoading || isLoadingNextPage}
            >
              Load more organizations
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}
