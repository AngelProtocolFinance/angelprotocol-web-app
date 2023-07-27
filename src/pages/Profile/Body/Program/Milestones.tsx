import { MileStone as TMilestone } from "types/aws";
import Image from "components/Image";
import RichText from "components/RichText";
import { Info } from "components/Status";
import Container from "../common/Container";

type Props = {
  classes?: string;
  milestones: TMilestone[];
};

export default function Milestones({ classes = "", milestones }: Props) {
  return (
    <Container
      title="Milestones"
      classes={classes + " w-full lg:w-[29.75rem]"}
      expanded
    >
      {milestones.length > 0 ? (
        <div className="m-8">
          {milestones.map((m, idx) => (
            <Milestone {...m} key={idx} />
          ))}
        </div>
      ) : (
        <Info classes="m-6">No milestones found</Info>
      )}
    </Container>
  );
}

function Milestone({
  milestone_media,
  milestone_date,
  milestone_title,
  milestone_description,
}: TMilestone) {
  return (
    <div className="pb-4 pt-4 first:pt-0 last:pb-0 border-l border-orange">
      <div className="pl-8">
        <Image src={milestone_media} className="h-60 w-full rounded" />
      </div>

      <p className="mt-4 pl-8 mb-3 text-gray-d1 dark:text-gray text-xs">
        {new Date(milestone_date).toLocaleDateString()}
      </p>
      <h6 className="pl-8 font-bold font-work mb-3 relative">
        {milestone_title}
        <span className="bg-white w-4 h-6 rounded-full absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <span className="bg-orange w-4 h-4 rounded-full absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2" />
      </h6>
      <RichText
        content={milestone_description}
        readOnly
        classes={{
          container: "text-gray-d1 dark:text-gray text-sm ml-8 w-full",
        }}
      />
    </div>
  );
}
