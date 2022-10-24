import { useRef } from "react";
import { useEndowmentsQuery } from "services/aws/aws";
import { QueryLoader } from "components/admin";
import { useGetter, useSetter } from "store/accessors";
import { setCutoff } from "slices/components/marketFilter";
import Page from "./Page";

export default function Cards({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const { sdgs, types, cutoff, sort } = useGetter(
    (state) => state.component.marketFilter
  );

  const [, members] = Object.entries(sdgs).find(
    ([, members]) => members.length > 0
  ) || ["", []];

  const prevCutoffRef = useRef<number | undefined>(undefined);
  const { isLoading, isFetching, data, isError } = useEndowmentsQuery({
    "alphabet-order": sort && sort.key === "name" ? sort.isAscending : false,
    type: types[0], //TODO: set to types[]
    tier: "Level3", //TODO: set to tier[]
    sdg: members[0], //TODO: set to sdgs[]
    cutoff,
    prevCutoff: prevCutoffRef.current,
  });

  const hasMore = !!data?.ItemCutoff;
  const hasPrevious = !!cutoff;

  //button is hidden when there's no more
  function loadNextPage() {
    if (data?.ItemCutoff) {
      //save curr key before setting next key
      prevCutoffRef.current = cutoff;
      dispatch(setCutoff(data.ItemCutoff + 1));
    }
  }

  function loadPrevious() {
    if (cutoff) {
      dispatch(setCutoff(prevCutoffRef.current));
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

          {hasMore && (
            <button
              className="btn-orange rounded-md p-2 text-sm w-full mt-6"
              onClick={loadNextPage}
              disabled={isLoading || isFetching}
            >
              Load more organizations
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}
