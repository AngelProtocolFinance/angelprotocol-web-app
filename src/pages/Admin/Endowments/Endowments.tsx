import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import DataTable from "./Table";
import AdminSideNav from "../AdminSideNav";
import useEndowments from "./useEndowments";
import Loader from "components/Loader/Loader";

export default function Endowments() {
  const decodedToken = useGetToken();
  const { loading, endowments, endowmentDetails } = useEndowments();

  if (!decodedToken?.apToken) {
    return <Redirect to={`${site.admin}/${app.login}`} />;
  }
  return (
    <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-gray-400 min-h-3/4 gap-0 mt-10 rounded-xl">
      <AdminSideNav />
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center">
          Endowments Management
        </h2>
        {/* Search bar */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {loading && (
            <div className="mt-20">
              <Loader
                bgColorClass="bg-white"
                gapClass="gap-2"
                widthClass="w-4"
              />
            </div>
          )}
          <div className="max-h-600 overflow-scroll shadow-md rounded-lg">
            {!loading && endowments && endowmentDetails && (
              <DataTable
                endowments={endowments}
                endowmentsDetails={endowmentDetails}
              ></DataTable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
