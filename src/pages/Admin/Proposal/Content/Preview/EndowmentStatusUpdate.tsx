import { AccountStatusMeta } from "contracts/createTx/meta";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function EndowmentStatusUpdate({
  from,
  to,
  beneficiary,
}: AccountStatusMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="previous status">
        <span className="uppercase font-heading font-bold">{from}</span>
      </KeyValue>
      <KeyValue _key="proposed status">
        <span className="uppercase font-heading font-bold">{to}</span>
      </KeyValue>
      <KeyValue _key="beneficiary">
        <span className="text-sm">{beneficiary}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
