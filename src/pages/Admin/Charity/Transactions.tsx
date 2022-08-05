import { Transaction } from "types/server/aws";
import { useDepositTransactionsQuery } from "services/flipslide/endowment_admin";
import CsvExporter from "components/CsvExporter";
import TransactionsTable from "./TransactionsTable";

const headers: { key: keyof Transaction; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "ust_amount", label: "Amount" },
  { key: "block_timestamp", label: "Date" },
  { key: "donator", label: "Donator" },
  { key: "tx_id", label: "Transaction Hash" },
];

export default function Transactions(props: { endowmentAddress: string }) {
  const {
    data = [],
    isLoading,
    isError,
  } = useDepositTransactionsQuery(props.endowmentAddress);

  return (
    <div className="mt-8 col-span-2 flex flex-col bg-white/10 p-4 rounded-md shadow-inner overflow-auto h-36">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white mb-2">
          Transaction History
        </h3>
        {!isLoading && data.length > 0 && (
          <CsvExporter
            headers={headers}
            data={data}
            filename="transactions.csv"
          />
        )}
      </div>
      <TransactionsTable
        transactions={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
