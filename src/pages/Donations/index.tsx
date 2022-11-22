import { useParams } from "react-router-dom";
import { useDonationsQuery } from "services/apes";
import { QueryLoader } from "components/admin";
import SearchFilter from "./SearchFilter";
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
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-28 text-white/80 bg-white">
      <div className="flex justify-between mt-10 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-d2">My Donations</h1>
        <button className="p-3 px-8 font-semibold bg-orange uppercase rounded-sm">
          Export to CSV
        </button>
      </div>
      <div className="grid grid-cols-3 my-8">
        <div className="col-span-2 mr-4">
          <input
            className="py-3 px-4 border border-gray-l2 w-full"
            type="text"
            placeholder="Search donations..."
          />
        </div>
        <SearchFilter />
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
    </div>
  );
}
