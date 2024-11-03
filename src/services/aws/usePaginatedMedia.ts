import type { MediaQueryParamsObj } from "@better-giving/endowment";
import { useState } from "react";
import { useSetter } from "store/accessors";
import {
  updateMediaQueryData,
  useLazyMediaQuery,
  useMediaQuery,
} from "./media";

export function usePaginatedMedia(
  endowId: number,
  initParams?: MediaQueryParamsObj
) {
  const dispatch = useSetter();

  const [params, setParams] = useState<MediaQueryParamsObj>(
    initParams ?? { type: "video" }
  );

  const queryState = useMediaQuery({ ...params, endowId });

  const { isLoading, isError, isFetching, data, originalArgs } = queryState;

  const [
    loadMore,
    {
      isLoading: isLoadingNextPage,
      isFetching: isFetchingNextPage,
      isError: isErrorNextPage,
    },
  ] = useLazyMediaQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (
      data?.nextPageKey &&
      originalArgs /** items won't even show if no initial query is made */
    ) {
      const { data: newPageRes } = await loadMore({
        ...originalArgs,
        nextPageKey: data.nextPageKey,
      });

      if (newPageRes) {
        //pessimistic update to original cache data
        dispatch(
          updateMediaQueryData("media", originalArgs, (prevResult) => {
            prevResult.items.push(...newPageRes.items);
            prevResult.nextPageKey = newPageRes.nextPageKey;
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
    isLoading,
    isFetching,
    isLoadingNextPage: isLoadingNextPage || isFetchingNextPage,
    loadNextPage,
    setParams,
  };
}
