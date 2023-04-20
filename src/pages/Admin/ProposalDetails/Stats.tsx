import { useState } from "react";
import { ProposalDetails } from "services/types";
import Icon from "components/Icon/Icon";
import { DetailLabel } from "components/admin";
import { roundDownToNum } from "helpers";
import Votes from "./Votes";

export default function Stats(props: ProposalDetails) {
  const { signed, signers } = props;
  const numSigned = signed.length;
  const numSigners = signers.length;

  const pctSigned = getPct(numSigned, numSigners);
  const pctPending = 100 - pctSigned;
  const pctTarget = getPct(
    1 /** TODO: this info can only be obtained from deployment: way to change this? */,
    numSigners
  );

  const [isVotesShown, setIsVotesShown] = useState(false);
  function toggleVotesTable() {
    setIsVotesShown((prev) => !prev);
  }
  return (
    <div>
      <DetailLabel classes="justify-between">
        <span className="flex items-center">
          <button
            onClick={toggleVotesTable}
            className={`text-3xs mr-2 p-1 rounded-sm transition transform border border-prim`}
          >
            <Icon type={isVotesShown ? "Dash" : "Plus"} className="w-6 h-6 " />
          </button>
          Votes
        </span>
        <span>
          Total: Voted: {numSigned}{" "}
          <span className="font-thin">({pctSigned}%)</span> Pending:{" "}
          {((numSigners * pctPending) / 100).toFixed(0)}{" "}
          <span className="font-thin">({pctPending}%)</span>
        </span>
      </DetailLabel>
      {isVotesShown && <Votes {...props} classes="mt-4" />}
    </div>
  );
}

function getPct(numerator: number, denominator: number) {
  return roundDownToNum((numerator / denominator) * 100);
}
