import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function DonationsTable({ classes = "" }) {
  const { id } = useAdminResources();
  const { data, ...rest } = useDonationsQuery({ id: id.toString() });

  return (
    <div className={classes}>
      <QueryLoader
        queryState={{ data: data?.Items, ...rest }}
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
