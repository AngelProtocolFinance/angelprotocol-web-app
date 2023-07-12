import { MultisigMemberMeta } from "types/tx";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function MultisigMember({
  action,
  address,
}: MultisigMemberMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key={`to ${action}`}>
        <span className="text-sm">{address}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
