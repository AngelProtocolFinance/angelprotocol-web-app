import { CWMemberUpdateMeta } from "@types-page/admin";
import Header from "./preview-components/Header";
import MemberItem from "./preview-components/MemberItem";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function CWMemberUpdate(props: CWMemberUpdateMeta["data"]) {
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
