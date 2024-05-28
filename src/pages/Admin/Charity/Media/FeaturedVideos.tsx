import QueryLoader from "components/QueryLoader";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";
import VideoPreview from "./VideoPreview";

type Props = {
  classes?: string;
  endowId: number;
};

export default function FeaturedVideos({ endowId, classes = "" }: Props) {
  const { data, isLoading, isFetching, isError } = usePaginatedMedia(endowId, {
    featured: true,
    type: "video",
    limit: 3,
  });
  return (
    <QueryLoader
      queryState={{ data: data?.items, isLoading, isFetching, isError }}
      classes={{ container: classes }}
      messages={{
        loading: "loading...",
        error: "failed to get videos",
        empty: "No featured videos",
      }}
    >
      {(items) => (
        <div
          className={`${classes} grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4`}
        >
          {items.map((item) => (
            <VideoPreview key={item.id} {...item} />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}
