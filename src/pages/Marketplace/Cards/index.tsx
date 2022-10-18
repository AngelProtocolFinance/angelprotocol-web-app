import { useEndowmentsQuery } from "services/aws/aws";
import { QueryLoader } from "components/admin";
import { useGetter, useSetter } from "store/accessors";
import { setKey } from "slices/components/marketFilter";
import Page from "./Page";

export default function Cards({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();
  const { sdgs, types, key } = useGetter(
    (state) => state.component.marketFilter
  );

  const [, members] = Object.entries(sdgs).find(
    ([, members]) => members.length > 0
  ) || ["", []];

  const { isLoading, isFetching, data, isError } = useEndowmentsQuery({
    type: types[0], //TODO: set to types[]
    // tier: "Level3", //TODO: set to tier[]
    sdg: members[0], //TODO: set to sdgs[]
    key,
  });

  const hasMore = !!data?.LastEvaluatedKey;

  //button is hidden when there's no more
  function loadNextPage() {
    if (data?.LastEvaluatedKey) {
      dispatch(setKey(data.LastEvaluatedKey));
    }
  }

  return (
    <QueryLoader
      queryState={{
        data: data?.Items,
        isLoading: isLoading || isFetching,
        isError,
      }}
      messages={{
        error: "Failed to get endowments",
        loading: "Getting endowments..",
      }}
      classes={{
        container: `mt-10 ml-10 ${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div className={`${classes} w-full grid content-start`}>
          <Page endowments={endowments} />
          {hasMore && (
            <button
              className="btn-orange rounded-md p-2 mt-4"
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
