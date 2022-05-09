import { useParams } from "react-router-dom";
import { useDonationTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import { Transaction } from "services/aws/endowment_admin/types";
import CsvExporter from "components/CsvExporter";
import DonationsTable from "./DonationsTable";

const headers: { key: keyof Transaction; label: string }[] = [
  { key: "amount", label: "amount" },
  { key: "transaction_date", label: "date" },
  { key: "endowment_address", label: "endowment" },
  { key: "sort_key", label: "transaction hash" },
];

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDonationTransactionsQuery(address!, {
    skip: !address,
  });
  return (
    <div className="grid content-start padded-container pb-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase text-white mt-2 mb-4">
          My Donations
        </h1>
        <CsvExporter headers={headers} data={data} filename="donations.csv" />
      </div>
      <DonationsTable
        transactions={data}
        isLoading={isLoading || isFetching}
        isError={isError}
      />
    </div>
  );
}
