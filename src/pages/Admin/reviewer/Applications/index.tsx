import { RegistrationStatus } from "types/server/aws";
import { useCharityApplicationsQuery } from "services/aws/registration";
import { useGetter } from "store/accessors";
import ApplicationsTable from "./Table";

export default function Applications() {
  const { activeStatus } = useGetter((state) => state.admin.applications);
  const { data = [], isLoading } = useCharityApplicationsQuery(activeStatus);

  return (
    <div className="">
      {(data.length > 0 && <ApplicationsTable applications={data} />) || (
        <p className="font-mono text-white place-self-center mt-20">
          <span className="capitalize">
            {isLoading ? "Loading Applications..." : "No applications found"}
          </span>
        </p>
      )}
    </div>
  );
}

export const statusColors: { [key in RegistrationStatus]: { text: string } } = {
  Inactive: { text: "text-grey-accent" },
  "Under Review": { text: "text-orange" },
  Approved: { text: "text-bright-green" },
  Active: { text: "text-bright-green" },
};
