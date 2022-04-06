import toCurrency from "helpers/toCurrency";
import { WithdrawMeta } from "pages/Admin/types";
import KeyValue from "./preview-components/KeyValue";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function FundTransfer(props: WithdrawMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="total amount" _classes="border-t border-white/10 mt-2">
        <span>$ {toCurrency(props.totalAmount, 2)}</span>
      </KeyValue>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{props.beneficiary}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
