import Loader from "components/Loader/Loader";
import { useGetAuthorized } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { admin, site } from "types/routes";
import AdminSideNav from "../AdminSideNav";
import DataTable from "./Table";
import useEndowments from "./useEndowments";

export default function Endowments() {
  // const auth = useGetAuthorized();
  const { loading, endowments, endowmentDetails } = useEndowments();

  // if (!auth.isAuthorized) {
  //   return <Redirect to={`${site.admin}/${admin.auth}`} />;
  // }
  return (
    <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-white bg-opacity-10 min-h-3/4 gap-0 mt-10 rounded-xl">
      <AdminSideNav />
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center text-white">
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
