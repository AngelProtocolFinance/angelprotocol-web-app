import { useDepositTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import { Transaction } from "services/aws/endowment_admin/types";
import CsvExporter from "components/CsvExporter";
import TransactionsTable from "./TransactionsTable";

const headers: { key: keyof Transaction; label: string }[] = [
  { key: "transaction_type", label: "Type" },
  { key: "amount", label: "Amount" },
  { key: "transaction_date", label: "Date" },
  { key: "wallet_address", label: "Wallet" },
  { key: "sort_key", label: "Transaction Hash" },
];

export default function Transactions(props: { endowmentAddress: string }) {
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDepositTransactionsQuery(props.endowmentAddress);

  return (
    <div className="col-span-2 flex flex-col bg-white/10 p-4 rounded-md shadow-md shadow-inner overflow-auto h-process">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white mb-2">
          Transaction History
        </h3>
        <CsvExporter headers={headers} data={data} filename="donations.csv" />
      </div>
      <TransactionsTable
        transactions={data}
        isLoading={isLoading || isFetching}
        isError={isError}
      />
    </div>
  );
}
