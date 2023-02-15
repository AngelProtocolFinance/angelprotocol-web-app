import { CW4MemberUpdateMeta } from "pages/Admin/types";
import Header from "./common/Header";
import MemberItem from "./common/MemberItem";
import PreviewContainer from "./common/PreviewContainer";

export default function CWMemberUpdate(props: CW4MemberUpdateMeta["data"]) {
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
