import { AllianceMemberWithFlags } from "slices/admin/types";
import TableSection, { Cells } from "components/TableSection";
import Member from "./Member";
import Toolbar from "./Toolbar";
import useAllianceSelection from "./useAllianceSelection";

export default function AllianceSelection() {
  const { filteredMembers, handleSearchTextChange, searchText, isDebouncing } =
    useAllianceSelection();

  return (
    <div className="h-96 overflow-auto rounded bg-orange-l6 dark:bg-blue-d7 border border-prim relative">
      <Toolbar
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      {(filteredMembers.length > 0 && (
        <MemberTable members={filteredMembers} />
      )) || (
        <p className="pl-4 pt-4 text-sm">
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
        <Cells type="th" cellClass="text-left uppercase font-heading">
          <></>
          <>name</>
          <>address</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-prim hover:bg-blue hover:bg-blue/10"
      >
        {props.members.map((member) => (
          <Member key={member.wallet} {...member} />
        ))}
      </TableSection>
    </table>
  );
}
