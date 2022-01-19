import withSideNav from "pages/Admin/withSideNav";
import Loader from "components/Loader/Loader";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useGetter } from "store/accessors";
import { admin } from "types/routes";
import DataTable from "./Table";
import useEndowments from "./useEndowments";

function Endowments() {
  const { path } = useRouteMatch();
  const adminAuthStatus = useGetter((state) => state.auth.admin.status);
  const { loading, endowments, endowmentDetails } = useEndowments();

  if (adminAuthStatus !== "authorized") {
    return <Redirect to={`${path}/${admin.auth}`} />;
  }
  return (
    <>
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl text-white font-semibold capitalize text-center">
          Endowments Management
        </h2>
        {/* Search bar */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
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
    </>
  );
}

export default withSideNav(Endowments);
