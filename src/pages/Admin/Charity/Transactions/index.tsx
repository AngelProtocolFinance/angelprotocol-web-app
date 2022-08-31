import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import LogRow from "./LogRow";

export default function Transactions() {
  const { cw3 } = useAdminResources();
  const { data = [], isLoading, isError } = useWithdrawLogsQuery(cw3);

  if (isLoading) {
    return (
      <p className="mt-6 flex gap-2 text-zinc-50/90">
        <Icon
          type="Loading"
          size={20}
          className="animate-spin relative top-1"
        />
        <span className="text-lg">Loading transactions..</span>
      </p>
    );
  }

  if (isError) {
    return (
      <p className="mt-6 flex gap-2 text-rose-200">
        <Icon type="Warning" size={20} className="relative top-1" />
        <span className="text-lg">Failed to get account info</span>
      </p>
    );
  }

  if (data.length <= 0) {
    return (
      <p className="mt-6 flex gap-2 text-zinc-50/90">
        <Icon type="Info" size={20} className="relative top-1" />
        <span className="text-lg">No transactions found.</span>
      </p>
    );
  }

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
      <TableSection type="tbody" rowClass="border-b border-zinc-50/10">
        {data.map((log, i) => (
          <LogRow {...log} key={i} />
        ))}
      </TableSection>
    </table>
  );
}
