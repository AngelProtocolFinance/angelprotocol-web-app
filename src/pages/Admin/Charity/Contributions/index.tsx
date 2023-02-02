import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function Contributions({ classes = "" }: { classes?: string }) {
  const { id } = useAdminResources();
  const queryState = useDonationsQuery({ id: id.toString() });

  return (
    <div className={`grid grid-rows-[auto_1fr] ${classes}`}>
      <h1 className="text-2xl font-extrabold uppercase mb-2">
        Received donations
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
