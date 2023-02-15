import { Link } from "react-router-dom";
import { Expiration, Proposal } from "types/contracts";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { adminRoutes } from "constants/routes";

type Props = { proposals: Proposal[] };
export default function Table({ proposals }: Props) {
  return (
    <table>
      <TableSection rowClass="border-b border-prim" type="thead">
        <Cells type="th" cellClass="p-1.5 uppercase text-left font-heading">
          <>title</>
          <>status</>
          <>expiry</>
        </Cells>
      </TableSection>
      <TableSection
        rowClass="last:border-none border-b border-prim hover:bg-blue-l4 hover:dark:bg-blue-d4"
        type="tbody"
      >
        {proposals.map(({ title, status, expires, id }) => (
          <Cells type="td" cellClass="p-1.5" key={id}>
            <>{title}</>
            <span className="uppercase text-sm">{status}</span>
            <Expiry {...expires} />
            <Link
              to={`${adminRoutes.proposal.url}/${id}`}
              className="flex items-center uppercase text-sm hover:bg-blue-l4 hover:dark:bg-blue-d4"
            >
              <span>Details</span>
              <Icon type="Forward" />
            </Link>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

function Expiry(props: Expiration) {
  const isTime = "at_time" in props;
  return isTime ? (
    <span className="text-sm">
      {new Date(props.at_time / 1e6).toLocaleString()}
    </span>
  ) : (
    <div className="flex gap-1">
      <Icon type="Blockchain" className="relative top-1" />
      <span>{props.at_height.toLocaleString()}</span>
    </div>
  );
}
