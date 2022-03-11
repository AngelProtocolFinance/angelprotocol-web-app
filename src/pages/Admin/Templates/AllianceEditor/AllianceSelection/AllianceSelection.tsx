import TableSection, { Cells } from "pages/Admin/components/TableSection";
import Member from "./Member";
import useInitMembers from "./useInitMembers";

export default function AllianceSelection() {
  const { isInitializing, allianceCopy } = useInitMembers();

  return (
    <div className="h-96 overflow-y-auto bg-light-grey shadow-inner-white-grey p-3 rounded-md">
      {(isInitializing && (
        <p className="font-mono text-sm text-angel-grey">
          loading alliance members..
        </p>
      )) || (
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
            {allianceCopy.map((member) => (
              <Member key={member.address} {...member} />
            ))}
          </TableSection>
        </table>
      )}
    </div>
  );
}
