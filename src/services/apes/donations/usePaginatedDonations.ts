import { chainIds } from "constants/chainIds";
import useDebouncer from "hooks/useDebouncer";
import { useEffect, useState } from "react";
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

type Args = (DonorOwner | EndowmentOwner) &
  Pick<DonationsQueryParams, "status">;

/**
 * By default loads finalized donations, unless the `status` field is
 * explicitly set to "PENDING"
 */
export default function usePaginatedDonationRecords<T extends Args>(args: T) {
  const dispatch = useSetter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const id: string = "endowmentId" in args ? args.endowmentId : args.email;

  const [params, setParams] = useState<DonationsQueryParams>({
    id,
    chain_id: chainIds.polygon,
    status: args.status,
  });

  useEffect(() => {
    setParams((prev) => ({ ...prev, status: args.status }));
  }, [args.status]);

  const queryState = useDonationsQuery(params, {
    skip: !id,
    selectFromResult({ data, ...rest }) {
      if (!data?.Items) {
        return { data, ...rest };
      }

      const filtered = data?.Items.filter(({ kycData: _, ...flatFields }) =>
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

  const { isLoading, isFetching, isError, error, data, originalArgs } =
    queryState;

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
    error: error,
    isLoading: isLoading || isDebouncing,
    isFetching,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange: setQuery,
    setParams,
  };
}
