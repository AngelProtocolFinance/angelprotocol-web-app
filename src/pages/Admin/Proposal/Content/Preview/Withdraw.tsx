import { EndowmentWithdrawMeta } from "pages/Admin/types";
import toCurrency from "helpers/toCurrency";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function Withdraw(props: EndowmentWithdrawMeta["data"]) {
  return (
    <PreviewContainer>
      {props.sourcesPreview.map((source, i) => (
        //map sources
        <KeyValue key={i} _key={`from ${source.vaultName}`}>
          <span>$ {toCurrency(props.totalAmount, 2)}</span>
        </KeyValue>
      ))}

      <KeyValue _key="total amount" _classes="border-t border-white/10 mt-2">
        <span>$ {toCurrency(props.totalAmount, 2)}</span>
      </KeyValue>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{props.beneficiary}</span>
      </KeyValue>
    </PreviewContainer>
  );
}
