import { useParams } from "react-router-dom";
import { DonationsParams } from "./types";
import { useDonationsQuery } from "services/apes";
import { QueryLoader } from "components/admin";
import Table from "./Table";

// import DonationsTable from "./DonationsTable";

export default function Donations() {
  const { address } = useParams<DonationsParams>();
  const queryState = useDonationsQuery(
    { id: address! },
    {
      skip: !address,
    }
  );

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container p-4 pt-28 text-white/80">
      <h1 className="text-2xl font-extrabold uppercase text-white mb-4">
        My Donations
      </h1>
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
