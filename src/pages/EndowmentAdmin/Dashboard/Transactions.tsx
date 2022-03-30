import { useDepositTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import TransactionsTable from "./TransactionsTable";

export default function Transactions(props: { endowmentAddress: string }) {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDepositTransactionsQuery(props.endowmentAddress);

  return (
    <div className="col-span-2 flex flex-col bg-white/10 p-4 rounded-md shadow-md shadow-inner overflow-auto h-process">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white mb-2">
        Transaction History
      </h3>
      <TransactionsTable
        transactions={data}
        isLoading={isLoading || isFetching}
        isError={isError}
      />
    </div>
  );
}
