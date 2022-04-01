import { useGetCharityApplicationsQuery } from "services/aws/registration";
import ApplicationsTable from "./ApplicationsTable";
import { RegistrationStatus } from "./types";

export default function Applications() {
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useGetCharityApplicationsQuery(RegistrationStatus.InReview);
  console.log(applications);
  return (
    <div className="p-3 grid grid-rows-a1 bg-white/10 shadow-inner rounded-md">
      {(applications.length > 0 && (
        <div className="overflow-auto scroll-hidden p-3 min-w-900">
          <h1 className="text-2xl text-white font-semibold">
            Charity Applications
          </h1>
          <ApplicationsTable applications={applications} isError={isError} />
        </div>
      )) || (
        <p className="font-mono text-white place-self-center">
          <span className="capitalize">
            {isLoading ? "Loading Applications..." : "No applications found"}
          </span>
        </p>
      )}
    </div>
  );
}
