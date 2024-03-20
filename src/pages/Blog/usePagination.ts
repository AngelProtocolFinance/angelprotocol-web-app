import {
  updateWordpressQueryData,
  useLazyPostsQuery,
  usePostsQuery,
} from "services/wordpress";
import { useSetter } from "store/accessors";

export default function usePagination() {
  const dispatch = useSetter();

  const queryState = usePostsQuery({});
  const { isLoading, isFetching, isError, data, originalArgs } = queryState;

  const [
    loadMore,
    { isFetching: isLoadingNextPage, isError: isErrorNextPage },
  ] = useLazyPostsQuery();

  async function loadNextPage() {
    //button is hidden when there's no more
    if (data?.nextPageNum && originalArgs) {
      const { data: newPageRes } = await loadMore({
        ...originalArgs,
        page: data.nextPageNum,
      });

      if (newPageRes) {
        //pessimistic update to original cache data
        dispatch(
          updateWordpressQueryData("posts", originalArgs, (prevPage) => {
            prevPage.posts.push(...newPageRes.posts);
            prevPage.nextPageNum = newPageRes.nextPageNum;
          })
        );
      }
    }
  }

  const hasMore = !!data?.nextPageNum;

  return {
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    isLoading,
    isFetching,
    isLoadingNextPage,
    loadNextPage,
  };
}
