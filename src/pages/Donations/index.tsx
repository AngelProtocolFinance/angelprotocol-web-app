import { useParams } from "react-router-dom";
import { DonationsParams } from "./types";
import { Donation } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Table from "./Table";

// import DonationsTable from "./DonationsTable";

const headers: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];

export default function Donations() {
  const { address } = useParams<DonationsParams>();
  const {
    data = [],
    isLoading,
    isError,
  } = useDonationsQuery(
    { id: address! },
    {
      skip: !address,
    }
  );

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

      <Table donations={data} isLoading={isLoading} isError={isError} />
    </div>
  );
}
