import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

type Props = {
  classes?: string;
};

export default function Table({ classes = "" }: Props) {
  const { cw3 } = useAdminResources();
  const queryState = useWithdrawLogsQuery(cw3);

  return (
    <table className={`w-full mt-6 ${classes}`}>
      <TableSection type="thead" rowClass="border-b-2 border-white/20">
        <Cells
          type="th"
          cellClass="text-left font-heading text-white/80 uppercase p-2"
        >
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="border-b border-white/10">
        <QueryLoader
          queryState={queryState}
          messages={{
            loading: <td>Loading transactions...</td>,
            error: <td>Failed to get transactions</td>,
            empty: <td>No transactions found</td>,
          }}
        >
          {(logs) => (
            <>
              {logs.map((log, i) => (
                <LogRow {...log} key={i} />
              ))}
            </>
          )}
        </QueryLoader>
      </TableSection>
    </table>
  );
}
