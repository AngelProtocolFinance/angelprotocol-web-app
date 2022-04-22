import { AllianceMemberWithFlags } from "slices/admin/allianceMembers";
import TableSection, { Cells } from "components/TableSection/TableSection";
import Member from "./Member";
import Toolbar from "./Toolbar";
import useAllianceSelection from "./useAllianceSelection";

export default function AllianceSelection() {
  const { filteredMembers, handleSearchTextChange, searchText, isDebouncing } =
    useAllianceSelection();

  return (
    <div className="h-96 overflow-auto bg-light-grey shadow-inner-white-grey rounded-md relative">
      <Toolbar
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      {(filteredMembers.length > 0 && (
        <MemberTable members={filteredMembers} />
      )) || (
        <p className="pl-4 pt-4 font-mono text-sm text-angel-grey">
          {`${
            isDebouncing
              ? `searching ${searchText}...`
              : `${searchText} no alliance member found`
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
        rowClass="border-b text-angel-grey hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {props.members.map((member) => (
          <Member key={member.wallet} {...member} />
        ))}
      </TableSection>
    </table>
  );
}
