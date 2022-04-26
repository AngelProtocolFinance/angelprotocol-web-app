import { Link } from "react-router-dom";
import { Proposal } from "@types-server/contracts";
import Icon from "components/Icons/Icons";
import toCurrency from "helpers/toCurrency";
import { adminRoutes } from "constants/routes";
import Status from "./Status";
import VoteStat from "./VoteStat";
import useProposalDetails from "./useProposalDetails";

export default function ProposalCard(props: Proposal) {
  const {
    isVoteEnded,
    remainingBlocks,
    expiry,
    numYes,
    numNo,
    numNotYet,
    pctNo,
    pctYes,
    pctNotYet,
  } = useProposalDetails(props);

  return (
    <Link
      to={`../${adminRoutes.proposal}/${props.id}`}
      className="bg-white/10 hover:bg-white/20 p-4 rounded-md shadow-inner"
    >
      <div className="font-mono font-bold flex justify-between items-center text-white-grey/80">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <p className="text-white pb-1 font-heading font-bold mt-2 border-b-2 border-white/40">
        {props.title}
      </p>
      <div className="flex justify-between mt-2 mb-6 text-sm">
        <VoteStat
          title="yes:"
          value={numYes}
          pct={pctYes}
          textColor="text-green-300"
        />
        <VoteStat
          title="no:"
          value={numNo}
          pct={pctNo}
          textColor="text-red-200"
        />
        <VoteStat
          title="remaining:"
          value={numNotYet}
          pct={pctNotYet}
          textColor="text-white"
        />
      </div>
      {isVoteEnded ? (
        <div className="text-white/80">
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting period ended
          </p>
          <p className="flex items-center justify-end">
            <span className="font-heading uppercase text-2xs mr-0.5">
              at block
            </span>
            <Icon type="Blockchain" className="mr-2" />
            <span className="font-heading text-sm">
              {toCurrency(expiry, 0)}
            </span>
          </p>
        </div>
      ) : (
        <div className="text-white/80">
          <p className="font-heading uppercase text-xs text-right mb-1">
            voting ends after
          </p>
          <p className="flex items-center justify-end">
            <Icon type="Blockchain" className="mr-2" />
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
