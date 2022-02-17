import Modal from "components/Modal/Modal";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { admin, site } from "types/routes";
import NewIndexFundModal from "./NewIndexFundModal";
import IndexFundTable from "./Table";
import UpdateMembersModal from "./UpdateMembersModal";
import withSideNav from "Admin/withSideNav";
import Action from "components/ActionButton/Action";
import { useGetter } from "store/accessors";

function IndexFund() {
  const [showIndexModal, setShowIndexModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const adminAuthStatus = useGetter((state) => state.auth.admin.status);

  //user can't access TCA page when not logged in or his prev token expired
  if (adminAuthStatus !== "authorized") {
    return <Redirect to={`${site.admin}/${admin.auth}`} />;
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
            <IndexFundTable onEditClick={() => setShowUpdateModal(true)} />
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
