import { Link, useParams } from "react-router-dom";
import { PollStatus } from "types/server/contracts";
import Icon from "components/Icon";
import { idParamToNumber } from "helpers";
import { denoms, symbols } from "constants/currency";
import { appRoutes } from "constants/routes";
import usePollDetails from "../usePollDetails";
import PollAction from "./PollAction";

export default function PollDetails() {
  const { id: pollId } = useParams<{ id?: string }>();
  const numPollId = idParamToNumber(pollId);
  const details = usePollDetails(numPollId);
  return (
    <div className="padded-container grid content-start gap-4">
      <Link
        to={appRoutes.govern}
        className="flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-blue mt-4 mb-4"
      >
        <Icon type="ArrowBack" size={15} /> back to proposals
      </Link>
      <div className="bg-white/10 p-6 rounded-md shadow-lg text-white/60 overflow-hidden">
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
              {details.vote_ended && details.status === "in_progress"
                ? "vote period ended"
                : details.status.replace("_", " ")}
            </span>
          </p>
        </div>
        <div className="border-b border-b-2 border-white/40 pb-2 flex justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{details.title}</h3>
          <PollAction poll_id={numPollId} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <Item title="Creator" value={details.creator} />
          <Item
            title="Amount"
            value={`${details.amount} ${symbols[denoms.halo]}`}
          />
          <div className="break-words">
            <h4 className="text-white font-heading uppercase text-xs font-bold mb-1">
              end time
            </h4>
            <p className="flex items-center">
              <span className="text-xs font-heading uppercase">
                block height
              </span>
              <Icon type="Blockchain" className="mx-2" />
              <span className="font-heading text-sm">{details.end_height}</span>
            </p>
          </div>
          <DetailsLink href={details.link} />
        </div>
        <div className="break-words">
          <p className="text-white font-heading uppercase text-xs font-bold mb-2">
            Description
          </p>
          <p>{details.description}</p>
        </div>
      </div>

      <div className="bg-white/10 p-6 shadow-inner rounded-md text-white/70">
        <h3 className="uppercase text-sm text-white/100 font-semibold mb-6">
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
  executed: { bg: "bg-green-400", text: "text-green-400" },
  expired: { bg: "bg-white", text: "text-white-grey" },
  failed: { bg: "bg-red-300", text: "text-red-300" },
  in_progress: { bg: "bg-white", text: "text-white-grey" },
  passed: { bg: "bg-green-400", text: "text-green-400" },
  rejected: { bg: "bg-red-300", text: "text-red-300" },
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
      <p>{props.value}</p>
    </div>
  );
}

function DetailsLink(props: { href: string }) {
  return (
    <div className="break-words">
      <h4 className="text-white font-heading uppercase text-xs font-bold mb-1">
        Link
      </h4>
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        {props.href}
      </a>
    </div>
  );
}
