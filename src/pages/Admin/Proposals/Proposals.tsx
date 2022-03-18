import { Link } from "react-router-dom";
import { SiHiveBlockchain } from "react-icons/si";
import { useLatestBlock } from "services/terra/queriers";
import { CWContracts } from "contracts/admin";
import { useProposals } from "services/terra/admin/queriers";
import toCurrency from "helpers/toCurrency";
import { admin, endowmentAdmin } from "constants/routes";
import Card from "./Card";

export default function Proposals(props: {
  cws: CWContracts;
  templatesLink: endowmentAdmin | admin;
}) {
  const block_height = useLatestBlock(10_000);
  const { proposals, isProposalsLoading } = useProposals(props.cws);

  return (
    <div className="p-3 grid grid-rows-a1 bg-white bg-opacity-10 shadow-inner rounded-md">
      <div className="flex items-center mb-3">
        <p className="ml-auto text-white-grey text-opacity-80 font-heading text-sm flex items-center mr-2">
          <span className="font-heading uppercase text-2xs mr-2">
            current block{" "}
          </span>
          <SiHiveBlockchain className="mr-1" />
          <span>{toCurrency(+block_height, 0)}</span>
        </p>
        <Link
          to={props.templatesLink}
          className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
        >
          + Create a proposal
        </Link>
      </div>
      {(proposals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {proposals.map((proposal) => (
            <Card key={proposal.id} {...proposal} />
          ))}
        </div>
      )) || (
        <p className="font-mono text-white place-self-center">
          {isProposalsLoading ? "loading proposals.." : "no proposals found"}
        </p>
      )}
    </div>
  );
}
