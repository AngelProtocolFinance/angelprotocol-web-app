import { OwnerMeta } from "contracts/createTx/meta";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function OwnerUpdate({ curr, new: newOwner }: OwnerMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="current owner">
        <span className="text-sm">{curr}</span>
      </KeyValue>
      <KeyValue _key="new owner">
        <span className="text-sm">{newOwner}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
