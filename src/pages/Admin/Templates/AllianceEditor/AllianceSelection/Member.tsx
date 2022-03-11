import { Cells } from "pages/Admin/components/TableSection";
import { AllianceMemberWithFlags } from "services/admin/allianceMembers";

export default function Member(member: AllianceMemberWithFlags) {
  return (
    <Cells
      type="td"
      cellClass={`py-2 ${
        member.isAdded
          ? "bg-green-400 bg-opacity-20"
          : member.isDeleted
          ? "bg-red-400 bg-opacity-10"
          : ""
      }`}
    >
      <img src={member.icon} alt="" className="w-8 h-8 object-contain" />
      <>{member.name}</>
      <span className="font-mono text-sm">{member.address}</span>
      <button>x</button>
    </Cells>
  );
}
