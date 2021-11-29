import Modal from "components/Modal/Modal";
import { useGetToken } from "contexts/AuthProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import IndexFundTable from "./Table";
import NewIndexFundModal from "./NewIndexFundModal";
import UpdateMembersModal from "./UpdateMembersModal";
import AdminSideNav from "../AdminSideNav";

export default function IndexFund() {
  const [showIndexModal, setShowIndexModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const decodedToken = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken?.apToken) {
    return <Redirect to={`${site.admin}/${app.login}`} />;
  }

  return (
    <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-gray-400 min-h-3/4 gap-0 mt-10 rounded-xl">
      <AdminSideNav />
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center">
          Index Funds Management
        </h2>
        <button
          className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-semibold "
          onClick={() => setShowIndexModal(true)}
        >
          Add new fund
        </button>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <IndexFundTable
              onEditClick={() => setShowUpdateModal(true)}
            ></IndexFundTable>
          </div>
        </div>
      </div>
      {showIndexModal && (
        <Modal setShown={() => setShowIndexModal(false)}>
          <NewIndexFundModal />
        </Modal>
      )}
      {showUpdateModal && (
        <Modal setShown={() => setShowUpdateModal(false)}>
          <UpdateMembersModal />
        </Modal>
      )}
    </div>
  );
}
