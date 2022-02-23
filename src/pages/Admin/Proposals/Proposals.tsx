import { Link, useRouteMatch } from "react-router-dom";
import { SiHiveBlockchain } from "react-icons/si";
import { useLatestBlock } from "services/terra/queriers";
import { useProposals } from "services/terra/admin/queriers";
import toCurrency from "helpers/toCurrency";
import { admin } from "constants/routes";
import Card from "./Card";

export default function Proposals() {
  const { path } = useRouteMatch();
  const block_height = useLatestBlock(10_000);
  const { proposals } = useProposals();

  return (
    <div className="mt-4 p-3 bg-white bg-opacity-10 shadow-inner rounded-md">
      <div className="flex items-center mb-3">
        <p className="uppercase text-2xl font-bold text-white-grey mr-4">
          Proposals
        </p>
        <p className="ml-auto text-white-grey text-opacity-80 font-heading text-sm flex items-center mr-2">
          <span className="font-heading uppercase text-2xs mr-2">
            current block{" "}
          </span>
          <SiHiveBlockchain className="mr-1" />
          <span>{toCurrency(+block_height, 0)}</span>
        </p>
        <Link
          to={`${path}${admin.proposal_types}`}
          className="px-3 pt-1.5 pb-1 text-white-grey bg-bright-blue hover:bg-angel-blue font-heading text-sm uppercase text-center rounded-md"
        >
          + Create a proposal
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {proposals.map((proposal) => (
          <Card key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
}
