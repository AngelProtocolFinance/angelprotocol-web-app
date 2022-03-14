import { AllianceMemberWithFlags } from "services/admin/allianceMembers";
import TableSection, { Cells } from "pages/Admin/components/TableSection";
import useAllianceSelection from "./useAllianceSelection";
import Member from "./Member";
import Toolbar from "./Toolbar";

export default function AllianceSelection() {
  const {
    filteredMembers,
    handleSearchTextChange,
    searchText,
    isInitializing,
    isDebouncing,
  } = useAllianceSelection();

  return (
    <div className="h-96 overflow-auto bg-light-grey shadow-inner-white-grey rounded-md relative">
      <Toolbar
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      {(isInitializing && (
        <p className="font-mono text-sm text-angel-grey p-2">
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
    <table className="table-auto w-full">
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
