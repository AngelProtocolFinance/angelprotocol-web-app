import Modal from "components/Modal/Modal";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { admin, site } from "types/routes";
import AllianceMembersTable from "./Table";
import NewMemberModal from "./AddMemberModal";
import RemoveMemberModal from "./RemoveMemberModal";
import { Details } from "services/aws/alliance/types";
import Loader from "components/Loader/Loader";
import withSideNav from "Admin/withSideNav";
import { useGetter } from "store/accessors";
import { prepareData, useAllianceMembers } from "./useAllianceMembers";
import { ToastContainer } from "react-toastify";

function AllianceMembers() {
  const { members, isLoading } = useAllianceMembers();
  const [displayData, setDisplayData] = useState<Details[]>(members);
  const [selectedMember, setSelectedMember] = useState<Details>();
  const [showNewModal, setShowNewModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const adminAuthStatus = useGetter((state) => state.auth.admin.status);

  useEffect(() => {
    setDisplayData(members);
  }, [members]);

  const onClickRemove = (index: number) => {
    if (members) {
      setSelectedMember(members[index]);
      setShowRemoveModal(true);
    }
  };

  function reload(data: Details[]) {
    setShowNewModal(false);
    setShowRemoveModal(false);
    setDisplayData(prepareData(data));
  }

  // user can't access TCA page when not logged in or his prev token expired
  if (adminAuthStatus !== "authorized") {
    return <Redirect to={`${site.admin}/${admin.auth}`} />;
  }
  return (
    <>
      <div className="flex-grow w-full min-h-3/4 p-10 text-center font-heading">
        <h2 className="text-2xl font-semibold capitalize text-center text-white">
          Alliance Members Management
        </h2>
        <button
          className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-semibold"
          onClick={() => setShowNewModal(true)}
        >
          Add New Member
        </button>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {isLoading ? (
            <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
          ) : (
            displayData.length > 0 && (
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <AllianceMembersTable
                  members={displayData}
                  onRemoveClick={(index: number) => onClickRemove(index)}
                />
              </div>
            )
          )}
        </div>
      </div>
      {showNewModal && (
        <Modal setShown={() => setShowNewModal(false)}>
          <NewMemberModal reloadMembers={reload} />
        </Modal>
      )}
      {showRemoveModal && (
        <Modal setShown={() => setShowRemoveModal(false)}>
          <RemoveMemberModal member={selectedMember} reloadMembers={reload} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}

export default withSideNav(AllianceMembers);
