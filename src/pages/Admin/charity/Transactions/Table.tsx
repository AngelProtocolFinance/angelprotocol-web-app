import { WithdrawLog } from "types/server/aws";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

export default function TransactionsTable(props: { withdraws: WithdrawLog[] }) {
  return (
    <table className="col-span-2">
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/20">
        <Cells
          type="th"
          cellClass="text-left font-heading text-zinc-50/80 uppercase p-2"
        >
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="border-b border-zinc-50/10">
        {props.withdraws.map((log, i) => (
          <LogRow {...log} key={i} />
        ))}
      </TableSection>
    </table>
  );
}
