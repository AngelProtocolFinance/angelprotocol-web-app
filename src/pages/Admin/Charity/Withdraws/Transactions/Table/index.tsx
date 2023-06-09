import { WithdrawLog } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

type Props = {
  withdraws: WithdrawLog[];
  classes?: string;
};

export default function Table({ withdraws, classes = "" }: Props) {
  return (
    <table className={`w-full mt-6 ${classes}`}>
      <TableSection type="thead" rowClass="border-b-2 border-prim">
        <Cells type="th" cellClass="text-left font-heading uppercase p-2">
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="border-b border-prim">
        {withdraws.map((log, i) => (
          <LogRow {...log} key={i} />
        ))}
      </TableSection>
    </table>
  );
}
