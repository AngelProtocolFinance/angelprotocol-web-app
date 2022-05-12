import { createContext, useContext, useState } from "react";
import { useGetCharityApplicationsQuery } from "services/aws/registration";
import ApplicationsTable from "./ApplicationsTable";
import StatusSelector from "./StatusSelector";
import { ApplicationStatusOptions } from "./types";

export default function Applications() {
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatusOptions>("all");
  const {
    data = [],
    isLoading,
    isError,
  } = useGetCharityApplicationsQuery(applicationStatus);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setApplicationStatus(ev.target.value as ApplicationStatusOptions);
  }

  return (
    <div className="px-3 pb-3 grid grid-rows-a1 bg-white/10 shadow-inner rounded-md">
      {(data.length > 0 && (
        <div className="scroll-hidden p-3 overflow-auto ">
          <div className="flex flex-row justify-between mb-10">
            <h1 className="text-2xl text-white font-semibold">
              Charity Applications
            </h1>
            <getContext.Provider value={{ activeStatus: applicationStatus }}>
              <setContext.Provider value={{ handleStatusChange }}>
                <StatusSelector />
              </setContext.Provider>
            </getContext.Provider>
          </div>
          <ApplicationsTable applications={data} isError={isError} />
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

interface State {
  activeStatus: ApplicationStatusOptions;
}
interface Setters {
  handleStatusChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

const initialState: State = {
  activeStatus: "all",
};
const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  handleStatusChange: () => {},
});
//only use this hook inside PhantomProvider
export const useGetApplicationsState = () => useContext(getContext);
export const useSetApplicationsState = () => useContext(setContext);

export const statusColorClasses: Record<string, string> = {
  Inactive: "bg-grey-accent",
  Active: "bg-bright-green",
  Approved: "bg-bright-green",
  "Under Review": "bg-orange",
  "Not Complete": "bg-failed-red",
};
