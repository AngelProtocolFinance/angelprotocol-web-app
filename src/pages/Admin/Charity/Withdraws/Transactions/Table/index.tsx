import { WithdrawLog } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

type Props = {
  withdraws: WithdrawLog[];
  classes?: string;
};

export default function Table({ withdraws, classes = "" }: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Amount</>
          <>Network</>
          <>Withdrawal address/Account</>
          <>Blockchain record</>
          <>Status</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
      >
        {withdraws.map((log, i) => (
          <LogRow {...log} key={i} />
        ))}
      </TableSection>
    </table>
  );
}
