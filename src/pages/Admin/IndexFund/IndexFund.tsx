import Modal from "components/Modal/Modal";
import { useGetToken } from "contexts/AuthProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import IndexFundTable from "./Table";
import NewIndexFundModal from "./NewIndexFundModal";
import UpdateMembersModal from "./UpdateMembersModal";
import withSideNav from "Admin/withSideNav";
import Action from "components/ActionButton/Action";

function IndexFund() {
  const [showIndexModal, setShowIndexModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const decodedToken = useGetToken();

  // user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken?.apToken) {
    return <Redirect to={`${site.admin}/${app.login}`} />;
  }
  return (
    <>
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center text-white mb-5">
          Index Funds Management
        </h2>
        <Action
          title="Add fund"
          classes="action-button font-light"
          onClick={() => setShowIndexModal(true)}
        />
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-3">
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
    </>
  );
}

export default withSideNav(IndexFund);
