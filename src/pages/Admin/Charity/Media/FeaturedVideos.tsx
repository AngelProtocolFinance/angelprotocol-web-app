import QueryLoader from "components/QueryLoader";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";

export default function FeaturedVideos({ endowId }: { endowId: number }) {
  const query = usePaginatedMedia(endowId);
  return (
    <QueryLoader
      queryState={query}
      messages={{ loading: "loading...", error: "failed to get videos" }}
    >
      {(data) => <>{data.items.length}</>}
    </QueryLoader>
  );
}
