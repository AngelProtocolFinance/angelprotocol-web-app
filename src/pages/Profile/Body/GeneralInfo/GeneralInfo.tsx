import QueryLoader from "components/QueryLoader";
import RichText from "components/RichText";
import { useProgramsQuery } from "services/aws/programs";
import { usePaginatedMedia } from "services/aws/usePaginatedMedia";
import { useProfileContext } from "../../ProfileContext";
import Container from "../common/Container";
import DetailsColumn from "./DetailsColumn";
import Media from "./Media";
import Programs from "./Programs";

export default function GeneralInfo({ className = "" }) {
  const profile = useProfileContext();
  const programs = useProgramsQuery(profile.id);
  const { data: media, ...mediaState } = usePaginatedMedia(profile.id, {
    featured: true,
  });

  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <div className="flex flex-col gap-8 w-full h-full">
        <Container title="Overview">
          <RichText
            content={{ value: profile.overview ?? "" }}
            classes={{ container: "w-full h-full px-8 py-10" }}
            readOnly
          />
        </Container>
        <QueryLoader
          queryState={programs}
          messages={{ error: "Failed to load programs", empty: <></> }}
        >
          {(programs) => (
            <Container title="Programs">
              <Programs programs={programs} />
            </Container>
          )}
        </QueryLoader>
        <QueryLoader
          queryState={{ data: media?.items, ...mediaState }}
          messages={{ error: "Failed to load media", empty: <></> }}
        >
          {(media) => (
            <Container title="Media">
              <Media media={media} />
            </Container>
          )}
        </QueryLoader>
      </div>
      <DetailsColumn className="self-start lg:sticky lg:top-[5.5rem]" />
    </div>
  );
}
