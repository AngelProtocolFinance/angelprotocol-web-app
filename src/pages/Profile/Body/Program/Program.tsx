import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { RichText } from "components/RichText";
import { humanize } from "helpers";
import { useProfileContext } from "pages/Profile/ProfileContext";
import { useParams } from "react-router-dom";
import { useProgramQuery } from "services/aws/programs";
import Container from "../common/Container";
import Milestones from "./Milestones";

export default function Program({ className = "" }) {
  const { id: endowId } = useProfileContext();
  const { programId = "" } = useParams();
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
          <Container title={p.title} expanded>
            <RichText
              content={{ value: p.description }}
              readOnly
              classes={{ container: "m-6" }}
            />
            {p.targetRaise ? (
              <TargetProgress
                target={p.targetRaise}
                total={p.totalDonations ?? 0}
              />
            ) : null}
          </Container>
          <Milestones
            classes="self-start lg:sticky lg:top-28"
            milestones={p.milestones}
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

type ProgressProps = {
  target: number;
  total: number;
};
function TargetProgress({ target, total }: ProgressProps) {
  const progressPct = Math.min(1, total / target) * 100;
  return (
    <div className="m-6 border-t border-gray-l4 pt-2 font-heading">
      <div className="mb-2 flex items-center gap-2">
        <p className="font-medium">Target raise:</p>
        <p className="font-bold text-navy-l1">${humanize(target)}</p>
      </div>
      <div className="h-4 rounded-full bg-gray-l4 relative overflow-clip">
        <div className="h-full bg-green" style={{ width: `${progressPct}%` }} />
      </div>
      {total ? (
        <div className="mt-1 flex items-center gap-2 text-sm text-navy-l1">
          <p>Donations received</p>
          <p>${humanize(total)}</p>
        </div>
      ) : null}
    </div>
  );
}
