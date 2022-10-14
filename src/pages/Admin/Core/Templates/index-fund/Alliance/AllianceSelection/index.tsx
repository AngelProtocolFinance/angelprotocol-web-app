import { AllianceMemberWithFlags } from "slices/admin/types";
import TableSection, { Cells } from "components/TableSection";
import Member from "./Member";
import Toolbar from "./Toolbar";
import useAllianceSelection from "./useAllianceSelection";

export default function AllianceSelection() {
  const { filteredMembers, handleSearchTextChange, searchText, isDebouncing } =
    useAllianceSelection();

  return (
    <div className="h-96 overflow-auto bg-gray-l4 shadow-inner-white rounded-md relative">
      <Toolbar
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      {(filteredMembers.length > 0 && (
        <MemberTable members={filteredMembers} />
      )) || (
        <p className="pl-4 pt-4 font-mono text-sm text-gray-d2">
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
          cellClass="text-left uppercase text-gray-d2 font-heading"
        >
          <></>
          <>name</>
          <>address</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b text-gray-d2 hover:bg-blue hover:bg-blue/10"
      >
        {props.members.map((member) => (
          <Member key={member.wallet} {...member} />
        ))}
      </TableSection>
    </table>
  );
}
