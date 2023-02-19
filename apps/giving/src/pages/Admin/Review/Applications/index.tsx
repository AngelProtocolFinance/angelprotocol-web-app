import { useGetter } from "@/store/accessors";
import { QueryLoader } from "@ap/components";
import { useEndowmentApplicationsQuery } from "@ap/services/aws";
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
        empty: "No applications found",
      }}
      classes={{ container: "mt-4" }}
    >
      {(applications) => <ApplicationsTable applications={applications} />}
    </QueryLoader>
  );
}
