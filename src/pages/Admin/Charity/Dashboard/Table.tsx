import { Link } from "react-router-dom";
import { Expiration, Proposal } from "types/contracts";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { adminRoutes } from "constants/routes";

type Props = { proposals: Proposal[] };
export default function Table({ proposals }: Props) {
  return (
    <table>
      <TableSection rowClass="border-b border-white/30" type="thead">
        <Cells
          type="th"
          cellClass="p-1 uppercase text-white/80 text-left font-heading"
        >
          <>title</>
          <>status</>
          <>expiry</>
        </Cells>
      </TableSection>
      <TableSection
        rowClass="last:border-none border-b border-white/10 hover:bg-white/5"
        type="tbody"
      >
        {proposals.map(({ title, status, expires, id }) => (
          <Cells type="td" cellClass="p-1 text-white/80" key={id}>
            <>{title}</>
            <span className="uppercase text-xs font-bold">{status}</span>
            <Expiry {...expires} />
            <Link
              to={`${adminRoutes.proposal}/${id}`}
              className="flex items-center uppercase text-xs hover:text-blue"
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
    <span className="font-mono text-sm">
      {new Date(props.at_time / 1e6).toLocaleString()}
    </span>
  ) : (
    <div className="flex gap-1">
      <Icon type="Blockchain" className="relative top-1" />
      <span className="font-mono">{props.at_height.toLocaleString()}</span>
    </div>
  );
}
