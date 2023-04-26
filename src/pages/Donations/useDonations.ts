import { useState } from "react";
import { useParams } from "react-router-dom";
import { DonationsQueryParams } from "types/aws";
import {
  updateDonationsQueryData,
  useDonationsQuery,
  useLazyDonationsQuery,
} from "services/apes";
import { useSetter } from "store/accessors";
import useDebouncer from "hooks/useDebouncer";

export default function useDonations() {
  const { address } = useParams<{ address: string }>();

  const dispatch = useSetter();

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const [params, setParams] = useState<DonationsQueryParams>({
    id: address || "",
    chain_id: "80001",
  });

  const queryState = useDonationsQuery(params, {
    skip: !address,
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

  const { isLoading, isError, data, originalArgs } = queryState;

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
    address,
    data,
    hasMore,
    isError: isError || isErrorNextPage,
    isLoading: isLoading || isDebouncing,
    isLoadingNextPage,
    query,
    loadNextPage,
    onQueryChange: setQuery,
    setParams,
  };
}
