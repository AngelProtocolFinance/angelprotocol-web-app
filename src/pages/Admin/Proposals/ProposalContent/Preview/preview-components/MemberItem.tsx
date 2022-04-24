import { Member } from "types/server/contracts";
import Icon, { IconTypes } from "components/Icons/Icons";

export default function MemberItem(props: {
  member: Member | string;
  iconType?: IconTypes;
}) {
  if (typeof props.member === "string") {
    return (
      <div className="flex items-center gap-1 p-0.5">
        <Icon type={props.iconType || "User"} />
        <span className="font-mono text-sm">{props.member}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 p-0.5">
        <Icon type={props.iconType || "User"} />
        <span className="font-mono text-sm">{props.member.addr}</span>
        <Icon type="PieChart" className="ml-2" />
        <span>{props.member.weight}</span>
      </div>
    );
  }
}
