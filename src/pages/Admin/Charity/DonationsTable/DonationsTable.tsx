import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id } = useAdminResources();
  const { data, ...rest } = useDonationsQuery({
    id: id.toString(),
    chain_id: "80001",
  });

  return (
    <div className={classes}>
      <QueryLoader
        queryState={{ data: data?.Items, ...rest }}
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
