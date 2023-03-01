import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Log from "./Log";

type Props = {
  classes?: string;
};
export default function List({ classes = "" }: Props) {
  const { cw3 } = useAdminResources();
  const queryState = useWithdrawLogsQuery(cw3);
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading transactions...",
        error: "Failed to get transactions",
        empty: "No transactions found",
      }}
    >
      {(logs) => (
        <ul className={`${classes} gap-2 sm:grid-cols-3`}>
          {logs.map((w) => (
            <Log {...w} key={w.proposal_id} />
          ))}
        </ul>
      )}
    </QueryLoader>
  );
}
