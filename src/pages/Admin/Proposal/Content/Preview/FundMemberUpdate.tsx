import { FundMemberUpdate as TFundMemberUpdate } from "types/contracts";
import Header from "./common/Header";
import KeyValue from "./common/KeyValue";
import MemberItem from "./common/MemberItem";
import PreviewContainer from "./common/PreviewContainer";

export default function FundMemberUpdate({
  fundId,
  add,
  remove,
}: TFundMemberUpdate) {
  return (
    <PreviewContainer>
      <KeyValue _key="fund id">
        <span>{fundId}</span>
      </KeyValue>
      {add.length > 0 && (
        <>
          <Header>members to remove</Header>
          {add.map((member) => (
            <MemberItem key={member} member={member} iconType="Safe" />
          ))}
        </>
      )}

      {remove.length > 0 && (
        <>
          <Header>members to remove</Header>
          {remove.map((member) => (
            <MemberItem key={member} member={member} iconType="Safe" />
          ))}
        </>
      )}
    </PreviewContainer>
  );
}
