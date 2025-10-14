import type { IMilestone } from "@better-giving/endowment";
import { Image } from "components/image";
import { RichText } from "components/rich-text";
import { Info } from "components/status";
import { Container } from "../common/container";

type Props = {
  classes?: string;
  milestones: IMilestone[];
};

export function Milestones({ classes = "", milestones }: Props) {
  return (
    <Container
      title="Milestones"
      classes={`${classes} w-full lg:w-[29.75rem]`}
      expanded
    >
      {milestones.length > 0 ? (
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

function Milestone(m: IMilestone) {
  const isComplete = new Date() >= new Date(m.date);

  return (
    <div
      className={`pb-4 pt-4 first:pt-0 last:pb-0 border-l ${
        isComplete ? "border-blue-d1" : "border-gray-l3"
      }`}
    >
      {m.media && (
        <div className="pl-6 sm:pl-8">
          <Image src={m.media} className="h-60 w-full rounded-sm" />
        </div>
      )}

      <p className="mt-4 pl-6 sm:pl-8 mb-3 text-gray dark:text-gray text-xs">
        {new Date(m.date).toLocaleDateString()}
      </p>
      <h6 className="pl-6 sm:pl-8 font-semibold mb-3 relative">
        {m.title}
        <span className="bg-white dark:bg-blue-d6 w-4 h-6 absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <span
          className={`${
            isComplete ? "bg-blue-d1" : "bg-gray-l3 dark:bg-gray-d1"
          } w-4 h-4 rounded-full absolute left-[-0.5px] top-1/2 -translate-y-1/2 -translate-x-1/2`}
        />
      </h6>
      <div className="pl-6 sm:pl-8">
        <RichText
          content={{ value: m.description ?? "" }}
          readOnly
          classes={{
            field: "text-gray dark:text-gray text-sm w-full",
          }}
        />
      </div>
    </div>
  );
}
