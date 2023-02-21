import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id } = useAdminResources();
  const queryState = useDonationsQuery({ id: id.toString() });

  return (
    <div className={classes}>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching contributions..",
          error: "Failed to get contributions",
          empty: "No contributions found",
        }}
      >
        {(donations) => <Table donations={donations} />}
      </QueryLoader>
    </div>
  );
}
