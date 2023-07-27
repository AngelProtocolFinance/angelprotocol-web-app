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
    <div className="pb-4 pt-4 first:pt-0 last:pb-0 pl-8 border-l border-orange">
      <Image
        src={milestone_media}
        className="h-60 w-full rounded"
        height={240}
      />
      <p className="mt-4 mb-3 text-gray-d1 dark:text-gray text-xs">
        {new Date(milestone_date).toLocaleDateString()}
      </p>
      <h6 className="font-bold font-work mb-3">{milestone_title}</h6>
      <RichText
        content={milestone_description}
        readOnly
        classes={{ container: "text-gray-d1 dark:text-gray text-sm" }}
      />
    </div>
  );
}
