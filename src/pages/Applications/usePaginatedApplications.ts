import { useState } from "react";
import { ApplicationsQueryParams } from "types/aws";
import {
  updateAWSQueryData,
  useApplicationsQuery,
  useLazyApplicationsQuery,
} from "services/aws/aws";
import { useSetter } from "store/accessors";
import useDebouncer from "hooks/useDebouncer";

export default function usePaginatedApplications() {
  const dispatch = useSetter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const [params, setParams] = useState<ApplicationsQueryParams>({
    limit: 10,
    regStatus: "Under Review",
  });

  const queryState = useApplicationsQuery(params, {
    selectFromResult({ data, ...rest }) {
      if (!data?.Items) {
        return { data, ...rest };
      }
      const filtered = data?.Items.filter(({ OrganizationName, PK }) =>
        (OrganizationName + PK)
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase()),
      );

      return {
        data: { Items: filtered, ItemCutoff: data.ItemCutoff },
        ...rest,
      };
    },
  });

  const { isLoading, isFetching, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyApplicationsQuery();

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
          updateAWSQueryData("applications", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          }),
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return {
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    isLoading: isLoading || isDebouncing,
    isFetching,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange: setQuery,
    setParams,
  };
}
