import Icon from "components/Icons/Icons";
import { CWMemberUpdateMeta } from "pages/Admin/types";
import { PropsWithChildren } from "react";
import { Member } from "services/terra/admin/types";

export default function MemberUpdatePreview(props: CWMemberUpdateMeta) {
  return (
    <div className="bg-white bg-opacity-10 shadow-inner p-2 rounded-md mb-2 mt-1">
      {props.toAdd.length > 0 && (
        <>
          <Header>members to add</Header>
          {props.toAdd.map((member) => (
            <MemberItem key={member.addr} member={member} />
          ))}
        </>
      )}

      {props.toRemove.length > 0 && (
        <>
          <Header>members to remove</Header>
          {props.toRemove.map((member) => (
            <MemberItem key={member} member={member} />
          ))}
        </>
      )}
    </div>
  );
}

function Header(props: PropsWithChildren<{}>) {
  return (
    <p className="text-xs font-heading uppercase border-b border-opacity-20 mt-4 first:mt-0 mb-1 p-0.5">
      {props.children}
    </p>
  );
}

function MemberItem(props: { member: Member | string }) {
  if (typeof props.member === "string") {
    return (
      <div className="flex items-center gap-1 p-0.5">
        <Icon type="User" />
        <span className="font-mono text-sm">{props.member}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 p-0.5">
        <Icon type="User" />
        <span className="font-mono text-sm">{props.member.addr}</span>
        <Icon type="PieChart" className="ml-2" />
        <span>{props.member.weight}</span>
      </div>
    );
  }
}
