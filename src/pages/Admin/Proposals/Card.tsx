import { Link, useRouteMatch } from "react-router-dom";
import { SiHiveBlockchain } from "react-icons/si";
import { Proposal, ProposalStatus } from "services/terra/admin/types";
import toCurrency from "helpers/toCurrency";
import useDetails from "./useDetails";
import { admin } from "constants/routes";
import Status from "./Status";

export default function Card(props: Proposal) {
  const { url } = useRouteMatch();
  const {
    isVoteEnded,
    remainingBlocks,
    blockHeight,
    numYes,
    numNo,
    numNotYet,
    pctNo,
    pctYes,
    pctNotYet,
  } = useDetails(props);
  return (
    <Link
      to={`${url}/${admin.proposal}/${props.id}`}
      className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-md shadow-md"
    >
      <div className="font-mono font-bold flex justify-between items-center text-white-grey text-opacity-80">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <p className="text-white pb-1 font-heading font-bold mt-2 border-b-2 border-opacity-40">
        {props.title}
      </p>
      <div className="flex justify-between mt-2 mb-6">
        <Stat
          title="yes:"
          value={numYes}
          pct={pctYes}
          textColor="text-green-300"
        />
        <Stat title="no:" value={numNo} pct={pctNo} textColor="text-red-200" />
        <Stat
          title="remaning:"
          value={numNotYet}
          pct={pctNotYet}
          textColor="text-white"
        />
      </div>
      {isVoteEnded ? (
        <div className="text-white text-opacity-80">
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting period ended
          </p>
          <p className="flex items-center justify-end">
            <span className="font-heading uppercase text-2xs mr-0.5">
              at block
            </span>
            <SiHiveBlockchain className="mr-2" />
            <span className="font-heading text-sm">
              {toCurrency(+blockHeight, 0)}
            </span>
          </p>
        </div>
      ) : (
        <div className="text-white text-opacity-80">
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting ends after
          </p>
          <p className="flex items-center justify-end">
            <SiHiveBlockchain className="mr-2" />
            <span className="font-heading text-sm">
              {toCurrency(remainingBlocks, 0)}
            </span>
            <span className="font-heading uppercase text-2xs ml-1">blocks</span>
          </p>
        </div>
      )}
    </Link>
  );
}

function Stat(props: {
  title: string;
  value: number;
  pct: number;
  textColor: string;
}) {
  return (
    <p
      className={`font-mono uppercase text-sm text-opacity-80 ${props.textColor}`}
    >
      <span>{props.title}</span>
      <span>{` ${props.value} (${props.pct.toFixed(2)}%)`}</span>
    </p>
  );
}
