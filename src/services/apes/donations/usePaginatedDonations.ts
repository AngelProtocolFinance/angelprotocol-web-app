import { chainIds } from "constants/chainIds";
import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import {
  updateDonationsQueryData,
  useDonationsQuery,
  useLazyDonationsQuery,
} from "services/apes";
import { useSetter } from "store/accessors";
import {
  DonationMadeByDonor,
  DonationReceivedByEndow,
  DonationsQueryParams,
  PaginatedAWSQueryRes,
} from "types/aws";

type DonorOwner = { email: string };
type EndowmentOwner = { endowmentId: string };

type RecordOwner = DonorOwner | EndowmentOwner;

export default function usePaginatedDonationRecords<T extends RecordOwner>(
  owner: T
) {
  const dispatch = useSetter();

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const id: string = "endowmentId" in owner ? owner.endowmentId : owner.email;

  const [params, setParams] = useState<DonationsQueryParams>({
    id,
    chain_id: chainIds.polygon,
  });

  const queryState = useDonationsQuery(params, {
    skip: !id,
    selectFromResult({ data, ...rest }) {
      if (!data?.Items) {
        return { data, ...rest };
      }

      const filtered = data?.Items.filter(({ kycData, ...flatFields }) =>
        Object.values(flatFields)
          .reduce<string>((result, val) => `${val}` + result, "")
          .toLocaleLowerCase()
          .includes(debouncedQuery.toLocaleLowerCase())
      );

      return {
        data: { Items: filtered, ItemCutoff: data.ItemCutoff },
        ...rest,
      };
    },
  });

  const { isLoading, isFetching, isError, data, originalArgs } = queryState;

  const [loadMore, { isLoading: isLoadingNextPage, isError: isErrorNextPage }] =
    useLazyDonationsQuery();

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
          updateDonationsQueryData("donations", originalArgs, (prevResult) => {
            prevResult.Items.push(...newEndowRes.Items);
            prevResult.ItemCutoff = newEndowRes.ItemCutoff;
          })
        );
      }
    }
  }

  const hasMore = !!data?.ItemCutoff;

  return {
    data: data as T extends EndowmentOwner
      ? PaginatedAWSQueryRes<DonationReceivedByEndow[]>
      : PaginatedAWSQueryRes<DonationMadeByDonor[]>,
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
