import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function Contributions() {
  const { id } = useAdminResources();
  const queryState = useDonationsQuery({ id: id.toString() });

  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-10">Contributions</h2>
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
