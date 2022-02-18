import { Link, useRouteMatch } from "react-router-dom";
import { useLatestBlock } from "services/terra/queriers";
import { SiHiveBlockchain } from "react-icons/si";
import toCurrency from "helpers/toCurrency";
import { admin } from "constants/routes";

export default function Proposals() {
  const { path } = useRouteMatch();
  const block_height = useLatestBlock();

  return (
    <div className="mt-4">
      <div className="border border-opacity-10 p-3 bg-white bg-opacity-10 shadow-md rounded-md flex items-center mb-3">
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
          className="px-3 pt-1.5 pb-1 text-white-grey bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30 shadow-sm font-heading text-sm uppercase text-center rounded-md"
        >
          + Create a proposal
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <p>proposal</p>
      </div>
    </div>
  );
}
