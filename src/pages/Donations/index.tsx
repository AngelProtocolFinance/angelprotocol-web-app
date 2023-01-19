import { useParams } from "react-router-dom";
import { Donation } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import QueryLoader from "components/QueryLoader";
import MobileTable from "./MobileTable";
import NoDonations from "./NoDonations";
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

  queryState.data = [];

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-4 bg-white dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: <NoDonations classes="mt-8 place-self-center" />,
        }}
      >
        {(donations) => {
          return (
            <>
              <div className="flex lg:justify-between lg:items-center justify-center mt-10 lg:mb-6">
                <h1 className="text-3xl font-bold">My Donations</h1>
                <CsvExporter
                  classes="hidden lg:flex justify-center p-3 px-8 font-semibold bg-orange uppercase rounded-[4px] hidden lg:block text-white"
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
                classes="lg:hidden justify-center text-white mt-6 p-3 px-8 font-semibold bg-orange uppercase rounded-[4px]"
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
