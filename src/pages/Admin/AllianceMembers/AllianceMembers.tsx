import { useAllianceMembers } from "services/aws/alliance/queriers";
import TableSection, { Cells } from "../components/TableSection";

export default function AllianceMembers() {
  const { allianceMembers } = useAllianceMembers();
  return (
    <div className="bg-white">
      <div className="bg-blue-400">toolbar</div>
      <table className="table-fluid w-full">
        <TableSection
          type="thead"
          rowClass="font-heading uppercase text-sm text-left"
        >
          <>
            <th className="px-4 pt-2 text-angel-grey"></th>
            <th className="px-4 pt-2 text-angel-grey">name</th>
            <th className="px-4 pt-2 text-angel-grey">address</th>
          </>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b select-none text-angel-grey hover:text-angel-blue cursor-pointer"
        >
          {allianceMembers.map((member) => (
            <>
              <img
                src={member.icon}
                className="w-16 h-16 object-contain rounded-sm p-2 ml-2 rounded-md"
              />
              <Cells
                key={member.address}
                attributes={member}
                toInclude={["name", "address"]}
                cellClass="font-mono px-4 py-2"
              />
            </>
          ))}
        </TableSection>
      </table>
    </div>
  );
}
