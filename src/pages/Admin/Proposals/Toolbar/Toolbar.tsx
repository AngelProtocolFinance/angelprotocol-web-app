import { Link } from "react-router-dom";
import { useLatestBlock } from "services/terra/queriers";
import Icon from "components/Icons/Icons";
import toCurrency from "helpers/toCurrency";
import { admin } from "constants/routes";
import GroupSelector from "./GroupSelector";
import StatusSelector from "./StatusSelector";

export default function Toolbar(props: { classes?: string }) {
  const block_height = useLatestBlock(10_000);
  return (
    <div className={`flex items-center gap-3 ${props.classes || ""}`}>
      <StatusSelector />
      <GroupSelector />
      <p className="ml-auto text-white-grey/80 font-heading text-sm flex items-center mr-2">
        <span className="font-heading uppercase text-2xs mr-2">
          current block{" "}
        </span>
        <Icon type="Blockchain" className="mr-1" />
        <span>{toCurrency(+block_height, 0)}</span>
      </p>
      <Link
        to={`../${admin.proposal_types}`}
        className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
