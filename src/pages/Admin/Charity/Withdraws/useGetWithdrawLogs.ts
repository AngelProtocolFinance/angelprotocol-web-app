import { useAdminResources } from "pages/Admin/Guard";
import {
  updateApesQueryData,
  useLazyWithdrawLogsQuery,
  useWithdrawLogsQuery,
} from "services/apes";
import { useSetter } from "store/accessors";

export default function useGetWithdrawLogs() {
  const dispatch = useSetter();
  const { multisig } = useAdminResources();
  const queryState = useWithdrawLogsQuery({ cw3: multisig, sort: "default" });

  const { isLoading, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyWithdrawLogsQuery();

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
          updateApesQueryData("withdrawLogs", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return {
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    isLoading,
    loadNextPage,
    isLoadingNextPage,
  };
}
