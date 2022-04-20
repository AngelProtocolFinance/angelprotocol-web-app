import { CWMemberUpdateMeta } from "pages/Admin/types";
import Header from "./preview-components/Header";
import MemberItem from "./preview-components/MemberItem";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function CWMemberUpdate(props: CWMemberUpdateMeta) {
  return (
    <PreviewContainer>
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
    </PreviewContainer>
  );
}
