import { useParams } from "react-router-dom";
import { Donation } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import { QueryLoader } from "components/admin";
import MobileTable from "./MobileTable";
import Table from "./Table";

// import DonationsTable from "./DonationsTable";

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const queryState = useDonationsQuery(
    { id: address! },
    {
      skip: !address,
    }
  );

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-4 bg-white dark:bg-blue-d4">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => {
          return (
            <>
              <div className="flex sm:justify-between sm:items-center justify-center mt-10 sm:mb-6">
                <h1 className="text-3xl font-bold text-gray-d2 dark:text-white">
                  My Donations
                </h1>
                <CsvExporter
                  classes="hidden sm:flex justify-center p-3 px-8 font-semibold bg-orange uppercase rounded-sm hidden sm:block text-white"
                  headers={csvHeaders}
                  data={donations}
                  filename="donations.csv"
                >
                  Export to CSV
                </CsvExporter>
              </div>
              <Table donations={donations} />
              <MobileTable donations={donations} />
              <CsvExporter
                classes="sm:hidden justify-center text-white mt-6 p-3 px-8 font-semibold bg-orange uppercase rounded-sm"
                headers={csvHeaders}
                data={donations}
                filename="donations.csv"
              >
                Export to CSV
              </CsvExporter>
            </>
          );
        }}
      </QueryLoader>
    </div>
  );
}

const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
