import { CW4Member } from "types/contracts";
import Icon, { IconType } from "components/Icon";

export default function MemberItem(props: {
  member: CW4Member | string;
  iconType?: IconType;
}) {
  if (typeof props.member === "string") {
    return (
      <div className="flex items-center gap-2 p-1">
        <Icon type={props.iconType || "User"} />
        <span className="text-sm">{props.member}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2 p-1">
        <Icon type={props.iconType || "User"} />
        <span className="text-sm">{props.member.addr}</span>
        <Icon type="PieChart" className="ml-1" />
        <span>{props.member.weight}</span>
      </div>
    );
  }
}
