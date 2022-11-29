import { useParams } from "react-router-dom";
import { useDonationsQuery } from "services/apes";
import { QueryLoader } from "components/admin";
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
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-28 bg-white dark:bg-blue-d4">
      <div className="flex sm:justify-between justify-center mt-10 sm:mb-6">
        <h1 className="text-2xl font-bold sm:mb-4 text-gray-d2 dark:text-white">
          My Donations
        </h1>
      </div>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => <Table donations={donations} />}
      </QueryLoader>
      <button className="mt-6 p-3 px-8 font-semibold bg-orange uppercase rounded-sm sm:hidden">
        Export to CSV
      </button>
    </div>
  );
}
