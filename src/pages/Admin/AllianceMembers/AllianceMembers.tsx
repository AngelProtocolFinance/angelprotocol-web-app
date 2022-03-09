import { AiOutlineEdit } from "react-icons/ai";

import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import { useFilteredAllianceMembers } from "services/aws/alliance/queriers";
import TableSection, { Cells } from "../components/TableSection";
import ToolBar from "./Toolbar";
import { MemberDetails } from "services/aws/alliance/types";

export default function AllianceMembers() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );
  const { filteredMembers } = useFilteredAllianceMembers(debouncedSearchText);

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
      )) || (
        <p className="pl-4 pt-4 font-mono text-angel-grey">
          {`${
            isDebouncing
              ? `searching ${searchText}...`
              : `${searchText} not found`
          }`}
        </p>
      )}
    </div>
  );
}

function MembersTable(props: { members: MemberDetails[] }) {
  return (
    <table className="table-auto w-full">
      <TableSection
        type="thead"
        rowClass="font-heading uppercase text-sm text-left"
      >
        <Cells type="th" cellClass="text-angel-blue pt-3">
          <></>
          <>name</>
          <>wallet address</>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b select-none text-angel-grey group hover:bg-angel-blue hover:bg-opacity-10"
      >
        {props.members.map((member) => (
          <Cells key={member.address} type="td" cellClass="">
            <img
              alt=""
              src={member.icon}
              className="w-16 h-16 object-contain rounded-sm p-2 ml-2 rounded-md"
            />
            <>{member.name}</>
            <span className="font-mono">{member.address}</span>
            <button className="group-hover:visible invisible">
              <AiOutlineEdit size={20} />
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
