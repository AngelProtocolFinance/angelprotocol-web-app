import { AccountStatusMeta } from "contracts/createTx/meta";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function EndowmentStatusUpdate({
  beneficiary,
}: AccountStatusMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="beneficiary">
        <span className="text-sm">{beneficiary}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
