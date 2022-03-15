import { useParams } from "react-router-dom";
import { SiHiveBlockchain } from "react-icons/si";
import useDetails from "./useDetails";
import PollAction from "./PollAction";
import { PollStatus } from "services/terra/gov/types";
import idParamToNumber from "helpers/idParamToNum";

export default function Details() {
  const { id: pollId } = useParams<{ id?: string }>();
  const numPollId = idParamToNumber(pollId);
  const details = useDetails(numPollId);
  return (
    <div className="padded-container grid content-start gap-4">
      <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-inner text-white text-opacity-60 overflow-hidden">
        <div className="flex items-center text-sm mb-6">
          <p className="mr-6">ID: {details.id}</p>
          <p>TEXT PROPOSAL</p>
          <p className="inline-block uppercase ml-auto font-heading font-bold text-xs flex items-center">
            <span
              className={`aspect-square inline-block w-4 rounded-full ${
                statusColors[details.status].bg
              } mr-1`}
            ></span>
            <span className={`${statusColors[details.status].text}`}>
              {details.vote_ended && details.status === PollStatus.in_progress
                ? "vote period ended"
                : details.status.replace("_", " ")}
            </span>
          </p>
        </div>
        <div className="border-b border-b-2 border-opacity-40 pb-2 flex justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{details.title}</h3>
          <PollAction poll_id={numPollId} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <Item title="Creator" value={details.creator} />
          <Item title="Amount" value={`${details.amount} HALO`} />
          <div className="break-words">
            <h4 className="text-white font-heading uppercase text-xs font-bold mb-1">
              end time
            </h4>
            <p className="flex items-center">
              <span className="text-xs font-heading uppercase">
                block height
              </span>
              <SiHiveBlockchain className="mx-2" />
              <span className="font-heading text-sm">{details.end_height}</span>
            </p>
          </div>
          <Item title="Link" value={details.link} />
        </div>
        <div className="break-words">
          <p className="text-white font-heading uppercase text-xs font-bold mb-2">
            Description
          </p>
          <p className="">{details.description}</p>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 p-6 shadow-inner rounded-md text-white text-opacity-70">
        <h3 className="uppercase text-sm text-opacity-100 font-semibold mb-6">
          Vote details
        </h3>
        <div className="grid grid-cols-3 justify-items-center mb-4">
          <Count
            title="voted"
            percent={details.voted_pct}
            value={details.quorum_val}
          />
          <Count
            title="yes"
            percent={details.yes_pct}
            value={details.yes_val}
            colorClass="text-green-500"
          />
          <Count
            title="no"
            percent={details.no_pct}
            value={details.no_val}
            colorClass="text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

const statusColors: { [key in PollStatus]: { bg: string; text: string } } = {
  [PollStatus.executed]: { bg: "bg-green-400", text: "text-green-400" },
  [PollStatus.expired]: { bg: "bg-white", text: "text-white-grey" },
  [PollStatus.failed]: { bg: "bg-red-300", text: "text-red-300" },
  [PollStatus.in_progress]: { bg: "bg-white", text: "text-white-grey" },
  [PollStatus.passed]: { bg: "bg-green-400", text: "text-green-400" },
  [PollStatus.rejected]: { bg: "bg-red-300", text: "text-red-300" },
};

function Count(props: {
  title: string;
  percent: string;
  value: string;
  colorClass?: string;
}) {
  return (
    <div className="grid place-items-center gap-2">
      <h4 className="text-sm uppercase">{props.title}</h4>
      <p className={`text-3xl font-bold ${props.colorClass}`}>
        {props.percent} %
      </p>
      <p className="text-sm">{props.value}</p>
    </div>
  );
}

function Item(props: { title: string; value: string }) {
  return (
    <div className="break-words">
      <h4 className="text-white font-heading uppercase text-xs font-bold mb-1">
        {props.title}
      </h4>
      <p className="">{props.value}</p>
    </div>
  );
}
