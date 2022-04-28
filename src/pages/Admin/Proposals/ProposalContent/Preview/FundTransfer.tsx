import { FundSendMeta } from "@types-page/admin";
import toCurrency from "helpers/toCurrency";
import { currency_text } from "constants/currency";
import KeyValue from "./preview-components/KeyValue";
import PreviewContainer from "./preview-components/PreviewContainer";

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
          {toCurrency(props.amount, 3)} {currency_text[props.currency]}
        </span>
      </KeyValue>
      <KeyValue _key="recipient">
        <span className="font-mono text-sm">{props.recipient}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
