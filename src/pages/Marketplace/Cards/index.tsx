import { useRef } from "react";
import { useEndowmentsQuery } from "services/aws/aws";
import { QueryLoader } from "components/admin";
import { useGetter, useSetter } from "store/accessors";
import { setKey } from "slices/components/marketFilter";
import Page from "./Page";

export default function Cards({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const { sdgs, types, key, sort } = useGetter(
    (state) => state.component.marketFilter
  );

  const [, members] = Object.entries(sdgs).find(
    ([, members]) => members.length > 0
  ) || ["", []];

  const { isLoading, isFetching, data, isError } = useEndowmentsQuery({
    "alphabet-order": sort && sort.key === "name" ? sort.isAscending : false,
    type: types[0], //TODO: set to types[]
    tier: "Level3", //TODO: set to tier[]
    sdg: members[0], //TODO: set to sdgs[]
    key,
  });

  const prevKeyRef = useRef<string | undefined>(undefined);
  const hasMore = !!data?.LastEvaluatedKey;
  const hasPrevious = !!key;

  //button is hidden when there's no more
  function loadNextPage() {
    if (data?.LastEvaluatedKey) {
      //save curr key before setting next key
      prevKeyRef.current = key;
      dispatch(setKey(data.LastEvaluatedKey));
    }
  }

  function loadPrevious() {
    if (key) {
      dispatch(setKey(prevKeyRef.current));
    }
  }

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
        container: `mt-4 ml-4 ${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div className={`${classes} w-full grid content-start`}>
          <Page endowments={endowments} />
          <div className="flex gap-2 items-center mt-8 justify-center">
            {hasPrevious && (
              <button
                className="btn-outline-blue rounded-md py-0.5 text-sm w-24"
                onClick={loadPrevious}
                disabled={isLoading || isFetching}
              >
                previous
              </button>
            )}
            {hasMore && (
              <button
                className="btn-orange rounded-md py-1 text-sm w-24"
                onClick={loadNextPage}
                disabled={isLoading || isFetching}
              >
                next
              </button>
            )}
          </div>
        </div>
      )}
    </QueryLoader>
  );
}

/**
 * 1. next_key | none
 * 2.
 */
