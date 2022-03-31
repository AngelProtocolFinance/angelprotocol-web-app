import { CWMemberUpdateMeta } from "pages/Admin/types";
import Header from "./preview-components/Header";
import MemberItem from "./preview-components/MemberItem";

export default function MemberUpdate(props: CWMemberUpdateMeta) {
  return (
    <div className="bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1">
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
