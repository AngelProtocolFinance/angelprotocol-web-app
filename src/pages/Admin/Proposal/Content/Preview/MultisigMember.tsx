import { MultisigMembersMeta } from "types/tx";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function MultisigMember({
  action,
  addresses,
}: MultisigMembersMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key={`to ${action}`} _classes="flex-col">
        <span className="grid">
          {addresses.map((address) => (
            <span key={address} className="text-sm">
              {address}
            </span>
          ))}
        </span>
      </KeyValue>
    </PreviewContainer>
  );
}
