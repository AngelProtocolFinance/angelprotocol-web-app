import { WithdrawMeta } from "pages/Admin/types";
import toCurrency from "helpers/toCurrency";
import KeyValue from "./preview-components/KeyValue";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function Withdraw(props: WithdrawMeta) {
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
