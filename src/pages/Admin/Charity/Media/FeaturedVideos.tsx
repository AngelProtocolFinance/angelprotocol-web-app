import QueryLoader from "components/QueryLoader";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";

type Props = {
  classes?: string;
  endowId: number;
};

export default function FeaturedVideos({ endowId, classes = "" }: Props) {
  const query = usePaginatedMedia(endowId);
  return (
    <QueryLoader
      queryState={query}
      classes={{ container: classes }}
      messages={{ loading: "loading...", error: "failed to get videos" }}
    >
      {(data) => <>{data.items.length}</>}
    </QueryLoader>
  );
}
