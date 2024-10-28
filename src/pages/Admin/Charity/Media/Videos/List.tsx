import QueryLoader from "components/QueryLoader";
import { Image } from "lucide-react";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";
import VideoPreview from "../VideoPreview";

type Props = {
  classes?: string;
  endowId: number;
};

export function List({ endowId, classes = "" }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    isLoadingNextPage,
    isError,
    hasMore,
    loadNextPage,
  } = usePaginatedMedia(endowId, {
    type: "video",
    limit: 10,
  });
  return (
    <QueryLoader
      queryState={{ data: data?.items, isLoading, isFetching, isError }}
      classes={{ container: classes }}
      messages={{
        loading: "loading...",
        error: "failed to get videos",
        empty: <NoVideo classes={classes} />,
      }}
    >
      {(items) => (
        <div
          className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}
        >
          {items.map((item) => (
            <VideoPreview key={item.id} {...item} />
          ))}
          {hasMore && (
            <button
              disabled={isLoadingNextPage || isLoading || isFetching}
              type="button"
              onClick={loadNextPage}
              className="col-span-full btn-outline-filled text-sm py-3"
            >
              {isLoadingNextPage ? "Loading..." : "Load more videos"}
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}

function NoVideo({ classes = "" }) {
  return (
    <div
      className={`bg-white ${classes} grid justify-items-center rounded border border-gray-l4 px-4 py-16`}
    >
      <Image className="text-navy-l2 text-2xl mb-6" />
      <p className="font-bold mb-2">Start by adding your first video</p>
      <p className="text-sm text-navy-l1">
        You have no videos. To add one, use the{" "}
        <span className="text-navy-d4 font-bold">Add video</span> button above.
      </p>
    </div>
  );
}
