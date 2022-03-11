import { useState, useMemo } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import TableSection, { Cells } from "pages/Admin/components/TableSection";
import Member from "./Member";
import useInitMembers from "./useInitMembers";
import useDebouncer from "hooks/useDebouncer";
import { AllianceMemberWithFlags } from "services/admin/allianceMembers";

export default function AllianceSelection() {
  const { isInitializing, allianceCopy } = useInitMembers();
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, isDebouncing] = useDebouncer<string>(
    searchText,
    300
  );

  const filteredMembers = useMemo(
    () =>
      allianceCopy.filter((member) =>
        debouncedSearchText === ""
          ? true
          : member.name
              .toLocaleLowerCase()
              .search(new RegExp(searchText.toLocaleLowerCase())) !== -1 ||
            member.address.search(
              new RegExp(searchText.toLocaleLowerCase().trim())
            ) !== -1
      ),
    [debouncedSearchText, allianceCopy]
  );

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="h-96 overflow-auto bg-light-grey shadow-inner-white-grey rounded-md relative">
      <div className="flex justify-end bg-angel-blue bg-opacity-30 p-3 sticky top-0 backdrop-filter backdrop-blur-sm">
        <div className="flex bg-light-grey text-angel-grey shadow-inner-white-grey p-1.5 rounded-md">
          <input
            id="__allianceSearch"
            placeholder="name or address"
            className="font-mono focus:outline-none bg-light-grey text-sm"
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <label htmlFor="__allianceSearch" className="self-center">
            <BiSearchAlt2 size={20} />
          </label>
        </div>
      </div>
      {(isInitializing && (
        <p className="font-mono text-sm text-angel-grey">
          loading alliance members..
        </p>
      )) ||
        (filteredMembers.length > 0 && (
          <MemberTable members={filteredMembers} />
        )) || (
          <p className="pl-4 pt-4 font-mono text-sm text-angel-grey">
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

function MemberTable(props: { members: AllianceMemberWithFlags[] }) {
  return (
    <table className="table-auto w-full m-3">
      <TableSection type="thead" rowClass="">
        <Cells
          type="th"
          cellClass="text-left uppercase text-angel-grey font-heading"
        >
          <></>
          <>name</>
          <>address</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b text-angel-grey hover:text-angel-blue"
      >
        {props.members.map((member) => (
          <Member key={member.address} {...member} />
        ))}
      </TableSection>
    </table>
  );
}
