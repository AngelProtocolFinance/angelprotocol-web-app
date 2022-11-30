import { useEndowmentApplicationsQuery } from "services/aws/registration";
import { QueryLoader } from "components/admin";
import { useGetter } from "store/accessors";
import ApplicationsTable from "./Table";

export default function Applications() {
  const { activeStatus } = useGetter((state) => state.admin.applications);
  const queryState = useEndowmentApplicationsQuery(activeStatus);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading applications...",
        error: "Failed to get applications",
      }}
    >
      {(applications) => <ApplicationsTable applications={applications} />}
    </QueryLoader>
  );
}
