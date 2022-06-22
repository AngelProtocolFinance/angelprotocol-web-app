import { useParams } from "react-router-dom";
import { Transaction } from "types/server/aws";
import { useDonationTransactionsQuery } from "services/flipslide/endowment_admin";
import CsvExporter from "components/CsvExporter";
import DonationsTable from "./DonationsTable";

const headers: { key: keyof Transaction; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "ust_amount", label: "Amount" },
  { key: "block_timestamp", label: "Date" },
  { key: "donator", label: "Donator" },
  { key: "tx_id", label: "Transaction Hash" },
];

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const {
    data = [],
    isLoading,
    isError,
  } = useDonationTransactionsQuery(address!, {
    skip: !address,
  });

  return (
    <div className="grid content-start padded-container p-4 mt-10 bg-white/10 overflow-auto h-36 rounded-md shadow-md shadow-inner">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold uppercase text-white mb-4">
          My Donations
        </h1>
        {!isLoading && data.length > 0 && (
          <CsvExporter headers={headers} data={data} filename="donations.csv" />
        )}
      </div>
      <DonationsTable
        transactions={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
