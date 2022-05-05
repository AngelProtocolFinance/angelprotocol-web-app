import { FundSendMeta } from "pages/Admin/types";
import toCurrency from "helpers/toCurrency";
import KeyValue from "./preview-components/KeyValue";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function FundTransfer(props: FundSendMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="from">
        <span className="uppercase text-xs font-heading">
          admin group contract
        </span>
      </KeyValue>
      <KeyValue _key="total amount" _classes="border-t border-white/10 mt-2">
        <span>
          {toCurrency(props.amount, 3)} {"TOKEN"}
        </span>
      </KeyValue>
      <KeyValue _key="recipient">
        <span className="font-mono text-sm">{props.recipient}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
