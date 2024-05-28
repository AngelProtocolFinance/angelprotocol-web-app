import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";
import VideoPreview from "../VideoPreview";

type Props = {
  classes?: string;
  endowId: number;
};

export function List({ endowId, classes = "" }: Props) {
  const { data, isLoading, isFetching, isError, hasMore, loadNextPage } =
    usePaginatedMedia(endowId, {
      type: "video",
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
            <button type="button" onClick={loadNextPage}>
              load more
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}

function NoVideo({ classes = "" }) {
  return (
    <div className={`bg-white ${classes}`}>
      <Icon type="Picture" />
      <p className="font-bold">Start by adding your first video</p>
      <p className="text-sm">
        You have no videos. To add one, use the <span>Add video</span> button
        above.
      </p>
    </div>
  );
}
