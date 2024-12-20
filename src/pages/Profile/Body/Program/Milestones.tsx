import type { Milestone as TMilestone } from "@better-giving/endowment";
import Image from "components/Image";
import { RichText } from "components/RichText";
import { Info } from "components/Status";
import { isEmpty } from "helpers";
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
      {!isEmpty(milestones) ? (
        <div className="m-6 sm:m-8">
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

function Milestone(m: TMilestone) {
  const isComplete = new Date() >= new Date(m.date);

  return (
    <div
      className={`pb-4 pt-4 first:pt-0 last:pb-0 border-l ${
        isComplete ? "border-blue-d1" : "border-gray-l4"
      }`}
    >
      {m.media && (
        <div className="pl-6 sm:pl-8">
          <Image src={m.media} className="h-60 w-full rounded" />
        </div>
      )}

      <p className="mt-4 pl-6 sm:pl-8 mb-3 text-navy-l1 dark:text-navy-l2 text-xs">
        {new Date(m.date).toLocaleDateString()}
      </p>
      <h6 className="pl-6 sm:pl-8 font-bold mb-3 relative">
        {m.title}
        <span className="bg-white dark:bg-blue-d6 w-4 h-6 absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <span
          className={`${
            isComplete ? "bg-blue-d1" : "bg-gray-l3 dark:bg-navy"
          } w-4 h-4 rounded-full absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2`}
        />
      </h6>
      <div className="pl-6 sm:pl-8">
        <RichText
          content={{ value: m.description ?? "" }}
          readOnly
          classes={{
            field: "text-navy-l1 dark:text-navy-l2 text-sm w-full",
          }}
        />
      </div>
    </div>
  );
}
