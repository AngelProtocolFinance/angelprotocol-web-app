import { useNavigate } from "react-router-dom";
import Icon from "components/Icon";
import { humanize } from "helpers";
import { governRoutes } from "constants/routes";
import usePollDetails from "../usePollDetails";

export default function PollCard(props: { poll_id: number }) {
  const navigate = useNavigate();
  const details = usePollDetails(props.poll_id);

  function goToPollDetail() {
    navigate(`${governRoutes.pollDetails}/${props.poll_id}`);
  }

  return (
    <div
      onClick={goToPollDetail}
      className="bg-white/10 hover:bg-white/20 cursor-pointer rounded-md p-6 text-white/80 shadow-inner"
    >
      <div className="flex justify-between text-sm mb-4">
        <p>ID: {details.id}</p>
        <p className="text-white bg-white/10 px-3 pt-1.5 pb-1 rounded-md uppercase font-heading text-3xs">
          {details.vote_ended && details.status === "in_progress"
            ? "vote period ended"
            : details.status.replace("_", " ")}
        </p>
      </div>
      <h4 className="text-white font-bold text-lg mt-1 border-b-2 border-white/20 mb-1 pb-1 overflow-hidden">
        {details.title}
      </h4>
      <div className="flex gap-4 mb-10">
        <Figure
          title="voted"
          percent={details.voted_pct}
          colorClass="text-white mr-auto"
        />
        <Figure
          title="yes"
          percent={details.yes_pct}
          colorClass="text-green-l1"
        />
        <Figure
          title="no"
          percent={details.no_pct}
          colorClass="text-red-l400"
        />
      </div>
      {details.vote_ended ? (
        <div>
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting period ended
          </p>
          <p className="flex items-center justify-end">
            <span className="font-heading uppercase text-3xs mr-0.5">
              at block
            </span>
            <Icon type="Blockchain" className="mr-2" />
            <span className="font-heading text-sm">
              {humanize(+details.end_height, 0)}
            </span>
          </p>
        </div>
      ) : (
        <div>
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting ends after
          </p>
          <p className="flex items-center justify-end">
            <Icon type="Blockchain" className="mr-2" />
            <span className="font-heading text-sm">
              {humanize(+details.blocks_remaining, 0)}
            </span>
            <span className="font-heading uppercase text-3xs ml-1">blocks</span>
          </p>
        </div>
      )}
    </div>
  );
}
function Figure(props: { title: string; percent: string; colorClass: string }) {
  return (
    <p className={`${props.colorClass}`}>
      <span className="mr-1 uppercase text-xs font-heading">
        {props.title} :
      </span>
      <span>{props.percent}%</span>
    </p>
  );
}
