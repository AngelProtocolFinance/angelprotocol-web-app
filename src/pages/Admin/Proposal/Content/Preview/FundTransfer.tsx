import { FundSendMeta } from "pages/Admin/types";
import { toCurrency } from "helpers";
import { symbols } from "constants/currency";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function FundTransfer(props: FundSendMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="from">
        <span className="uppercase text-xs font-heading">
          admin group contract
        </span>
      </KeyValue>
      <KeyValue _key="total amount" _classes="border-t border-white/10 mt-2">
        <span>
          {toCurrency(props.amount, 3)} {symbols[props.currency]}
        </span>
      </KeyValue>
      <KeyValue _key="recipient">
        <span className="font-mono text-sm">{props.recipient}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
