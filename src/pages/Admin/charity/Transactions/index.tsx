import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import Icon from "components/Icon";
import TransactionsTable from "./Table";

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
    <>
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white mt-10 mb-2">
        Transactions
      </h3>

      <TransactionsTable withdraws={data} />
    </>
  );
}
