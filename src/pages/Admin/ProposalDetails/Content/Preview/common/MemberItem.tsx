import Icon, { IconType } from "components/Icon";

export default function MemberItem(props: {
  member: number | string;
  iconType?: IconType;
}) {
  return (
    <div className="flex items-center gap-2 p-1">
      <Icon type={props.iconType || "User"} />
      <span className="text-sm">{props.member}</span>
    </div>
  );
}
