import { useState } from "react";
import { ApplicationStatusOptions, RegistrationStatus } from "types/server/aws";
import { useCharityApplicationsQuery } from "services/aws/registration";
import StatusSelector from "./StatusSelector";
import ApplicationsTable from "./Table";

export default function Applications() {
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatusOptions>("under-review");
  const { data = [], isLoading } =
    useCharityApplicationsQuery(applicationStatus);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setApplicationStatus(ev.target.value as ApplicationStatusOptions);
  }

  return (
    <div className="">
      {(data.length > 0 && (
        <div className="">
          <StatusSelector
            activeStatus={applicationStatus}
            onStatusChange={handleStatusChange}
          />
          <ApplicationsTable applications={data} />
        </div>
      )) || (
        <p className="font-mono text-white place-self-center mt-20">
          <span className="capitalize">
            {isLoading ? "Loading Applications..." : "No applications found"}
          </span>
        </p>
      )}
    </div>
  );
}

export const statusColorClasses: { [key in RegistrationStatus]: string } = {
  Inactive: "bg-grey-accent",
  "Under Review": "bg-orange",
  Approved: "bg-bright-green",
  Active: "bg-bright-green",
};
