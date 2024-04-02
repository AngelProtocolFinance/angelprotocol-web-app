import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import RichText from "components/RichText";
import { useProfileContext } from "pages/Profile/ProfileContext";
import { useParams } from "react-router-dom";
import { useProgramQuery } from "services/aws/aws";
import Container from "../common/Container";
import Milestones from "./Milestones";

export default function Program({ className = "" }) {
  const { id: endowId } = useProfileContext();
  const { id: programId = "" } = useParams();
  const query = useProgramQuery({ endowId, programId }, { skip: !programId });

  return (
    <QueryLoader
      queryState={query}
      classes={{ container: className }}
      messages={{ loading: <Skeleton className={className} /> }}
    >
      {(p) => (
        <div
          className={`${className} grid items-start grid-rows-[auto_auto] gap-8 w-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
        >
          <Container title={p.program_title} expanded>
            <RichText
              content={{ value: p.program_description }}
              readOnly
              classes={{ container: "m-6" }}
            />
          </Container>
          <Milestones
            classes="self-start lg:sticky lg:top-28"
            milestones={p.program_milestones}
          />
        </div>
      )}
    </QueryLoader>
  );
}

function Skeleton({ className = "" }) {
  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <ContentLoader className="h-80" />
      <div className="self-start lg:sticky lg:top-28 flex flex-col gap-8 w-full lg:w-[29.75rem] p-8 border border-gray-l4 rounded">
        <ContentLoader className="h-40" />
        <ContentLoader className="h-40" />
        <ContentLoader className="h-40" />
        <ContentLoader className="h-40" />
      </div>
    </div>
  );
}
