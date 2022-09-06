import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import TableSection, { Cells } from "components/TableSection";
import { QueryLoader } from "components/admin";
import LogRow from "./LogRow";

export default function Transactions() {
  const { cw3 } = useAdminResources();
  const queryState = useWithdrawLogsQuery(cw3);
  return (
    <table className="w-full mt-6 self-start">
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
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading transactions...",
          error: "Failed to get transactions",
        }}
        classes={{ container: "mt-4" }}
      >
        {(logs) =>
          logs.length > 0 ? (
            <TableSection type="tbody" rowClass="border-b border-zinc-50/10">
              {logs.map((log, i) => (
                <LogRow {...log} key={i} />
              ))}
            </TableSection>
          ) : (
            <div className="text-zinc-50/80">No transactions found</div>
          )
        }
      </QueryLoader>
    </table>
  );
}
