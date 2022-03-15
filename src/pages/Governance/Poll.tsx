import { useNavigate } from "react-router-dom";
import { SiHiveBlockchain } from "react-icons/si";
import { govern } from "constants/routes";
import toCurrency from "helpers/toCurrency";
import useDetails from "./useDetails";
import { PollStatus } from "services/terra/gov/types";

export default function Poll(props: { poll_id: number }) {
  const navigate = useNavigate();
  const details = useDetails(props.poll_id);

  function goToPollDetail() {
    navigate(`${govern.poll}/${props.poll_id}`);
  }

  return (
    <div
      onClick={goToPollDetail}
      className="bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer rounded-md p-6 text-white-grey text-opacity-80 shadow-inner"
    >
      <div className="flex justify-between text-sm mb-4">
        <p>ID: {details.id}</p>
        <p className="text-white bg-white bg-opacity-10 px-3 pt-1.5 pb-1 rounded-md uppercase font-heading text-2xs">
          {details.vote_ended && details.status === PollStatus.in_progress
            ? "vote period ended"
            : details.status.replace("_", " ")}
        </p>
      </div>
      <h4 className="text-white font-bold text-lg mt-1 border-b-2 border-white-grey border-opacity-20 mb-1 pb-1 overflow-hidden">
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
          colorClass="text-green-400"
        />
        <Figure title="no" percent={details.no_pct} colorClass="text-red-200" />
      </div>
      {details.vote_ended ? (
        <div>
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting period ended
          </p>
          <p className="flex items-center justify-end">
            <span className="font-heading uppercase text-2xs mr-0.5">
              at block
            </span>
            <SiHiveBlockchain className="mr-2" />
            <span className="font-heading text-sm">
              {toCurrency(+details.end_height, 0)}
            </span>
          </p>
        </div>
      ) : (
        <div>
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting ends after
          </p>
          <p className="flex items-center justify-end">
            <SiHiveBlockchain className="mr-2" />
            <span className="font-heading text-sm">
              {toCurrency(+details.blocks_remaining, 0)}
            </span>
            <span className="font-heading uppercase text-2xs ml-1">blocks</span>
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
