import { useState } from "react";
import { CgRemoveR } from "react-icons/cg";
import { useFilteredAllianceMembers } from "services/aws/alliance/queriers";
import { MemberDetails } from "services/aws/alliance/types";
import { useSetModal } from "components/Modal/Modal";
import useDebouncer from "hooks/useDebouncer";
import TableSection, { Cells } from "../components/TableSection";
import DeleteMemberPrompt from "./DeleteMemberPrompt";
import ToolBar from "./Toolbar";

export default function AllianceMembers() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );
  const { filteredMembers, isFilteredMembersLoading } =
    useFilteredAllianceMembers(debouncedSearchText);

  function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="bg-white rounded-sm overflow-hidden">
      <ToolBar
        handleSearchTextChange={handleSearchTextChange}
        searchText={searchText}
      />
      {(filteredMembers.length > 0 && (
        <MembersTable members={filteredMembers} />
      )) ||
        (isFilteredMembersLoading ? (
          <p className="pl-4 pt-4 font-mono text-angel-grey">loading..</p>
        ) : (
          <p className="pl-4 pt-4 font-mono text-angel-grey">
            {`${
              isDebouncing
                ? `searching ${searchText}...`
                : `${searchText} not found`
            }`}
          </p>
        ))}
    </div>
  );
}

function MembersTable(props: { members: MemberDetails[] }) {
  const { showModal } = useSetModal();

  const showDeleteConfirm = (member: MemberDetails) => () => {
    showModal(DeleteMemberPrompt, { ...member });
  };

  return (
    <table className="table-auto w-full border-collapse">
      <TableSection
        type="thead"
        rowClass="font-heading uppercase text-sm text-left"
      >
        <Cells type="th" cellClass="text-angel-blue p-2">
          <></>
          <>name</>
          <>wallet address</>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b text-angel-grey group hover:bg-angel-blue hover:bg-opacity-10"
      >
        {props.members.map((member) => (
          <Cells key={member.address} type="td" cellClass="p-2">
            <img
              alt=""
              src={member.icon}
              className="w-12 h-12 object-contain rounded-sm rounded-md ml-4"
            />
            <>{member.name}</>
            <span className="font-mono text-sm">{member.address}</span>
            <button
              className="group-hover:visible invisible active:text-red-400 mr-4"
              onClick={showDeleteConfirm(member)}
            >
              <CgRemoveR size={20} />
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
