import type { QueryParams } from "@better-giving/registration/approval";
import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import {
  updateAWSQueryData,
  useApplicationsQuery,
  useLazyApplicationsQuery,
} from "services/aws/aws";
import { useSetter } from "store/accessors";

export default function usePaginatedApplications() {
  const dispatch = useSetter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const [params, setParams] = useState<QueryParams>({
    status: "02",
  });

  const queryState = useApplicationsQuery(params, {
    selectFromResult({ data, ...rest }) {
      if (!data?.items) {
        return { data, ...rest };
      }
      const filtered = data?.items.filter(({ org_name, id }) =>
        (org_name + id).toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      return {
        data: { items: filtered, nextPageKey: data.nextPageKey },
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
      data?.nextPageKey &&
      originalArgs /** cards won't even show if no initial query is made */
    ) {
      const { data: newEndowRes } = await loadMore({
        ...originalArgs,
        nextPageKey: data.nextPageKey,
      });

      if (newEndowRes) {
        //pessimistic update to original cache data
        dispatch(
          updateAWSQueryData("applications", originalArgs, (prevResult) => {
            prevResult.items.push(...newEndowRes.items);
            prevResult.nextPageKey = newEndowRes.nextPageKey;
          })
        );
      }
    }
  }

  const hasMore = !!data?.nextPageKey;

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
