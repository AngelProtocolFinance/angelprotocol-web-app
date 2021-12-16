import Modal from "components/Modal/Modal";
import { useGetToken } from "contexts/AuthProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import DataTable from "./Table";
import UpdateMembersModal from "./UpdateEndowmentModal";
import AdminSideNav from "../AdminSideNav";
import useEndowments from "./useEndowments";

export default function Endowments() {
  const decodedToken = useGetToken();
  const { loading, endowments } = useEndowments();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // if (!decodedToken?.apToken) {
  //   return <Redirect to={`${site.admin}/${app.login}`} />;
  // }
  console.log("ends: ", endowments);
  return (
    <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-gray-400 min-h-3/4 gap-0 mt-10 rounded-xl">
      <AdminSideNav />
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center">
          Endowments Management
        </h2>
        {/* Search bar */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="max-h-600 overflow-scroll shadow-md rounded-lg">
            {!loading && endowments?.Items && (
              <DataTable
                onEditClick={() => setShowUpdateModal(true)}
                data={endowments?.Items}
              ></DataTable>
            )}
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <Modal setShown={() => setShowUpdateModal(false)}>
          <UpdateMembersModal />
        </Modal>
      )}
    </div>
  );
}
