import { useCharityApplicationsQuery } from "services/aws/registration";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";
import ApplicationsTable from "./Table";

export default function Applications() {
  const { activeStatus } = useGetter((state) => state.admin.applications);
  const {
    data = [],
    isLoading,
    isError,
  } = useCharityApplicationsQuery(activeStatus);
  // const data: CharityApplication[] = [];

  if (isLoading) {
    return (
      <p className="text-white-grey place-self-center flex items-center gap-1">
        <Icon type="Loading" className="animate-spin" />
        <span>Loading applications</span>
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-rose-400 place-self-center flex items-center gap-1">
        <Icon type="Warning" />
        <span>Failed to get applications</span>
      </p>
    );
  }

  return <ApplicationsTable applications={data} />;
}
