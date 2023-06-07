import { FundMemberUpdate as TFundMemberUpdate } from "types/contracts";
import Header from "./common/Header";
import KeyValue from "./common/KeyValue";
import MemberItem from "./common/MemberItem";
import PreviewContainer from "./common/PreviewContainer";

export default function FundMemberUpdate({
  fundId,
  members,
}: TFundMemberUpdate) {
  return (
    <PreviewContainer>
      <KeyValue _key="fund id">
        <span>{fundId}</span>
      </KeyValue>
      {members.length > 0 && (
        <>
          <Header>Updated members</Header>
          {members.map((member) => (
            <MemberItem key={member} member={member} iconType="Safe" />
          ))}
        </>
      )}
    </PreviewContainer>
  );
}
