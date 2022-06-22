import { FundMemberUpdateMeta } from "pages/Admin/types";
import Header from "./preview-components/Header";
import KeyValue from "./preview-components/KeyValue";
import MemberItem from "./preview-components/MemberItem";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function FundMemberUpdate(props: FundMemberUpdateMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="fund id">
        <span>{props.fundId}</span>
      </KeyValue>
      <KeyValue _key="fund name">
        <span>{props.fundName}</span>
      </KeyValue>
      {props.toAdd.length > 0 && (
        <>
          <Header>members to remove</Header>
          {props.toRemove.map((member) => (
            <MemberItem key={member} member={member} iconType="Safe" />
          ))}
        </>
      )}

      {props.toRemove.length > 0 && (
        <>
          <Header>members to remove</Header>
          {props.toRemove.map((member) => (
            <MemberItem key={member} member={member} iconType="Safe" />
          ))}
        </>
      )}
    </PreviewContainer>
  );
}
